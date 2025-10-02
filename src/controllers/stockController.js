const prisma = require('../prisma');

// Get all stock entries
const getAllStock = async (req, res, next) => {
  try {
    const stock = await prisma.stock.findMany({
      include: {
        product: true,
        location: true
      }
    });
    res.json(stock);
  } catch (error) {
    next(error);
  }
};

// Get stock by product
const getStockByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const stock = await prisma.stock.findMany({
      where: { productId: parseInt(productId) },
      include: {
        product: true,
        location: true
      }
    });
    res.json(stock);
  } catch (error) {
    next(error);
  }
};

// Get stock by location
const getStockByLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const stock = await prisma.stock.findMany({
      where: { locationId: parseInt(locationId) },
      include: {
        product: true,
        location: true
      }
    });
    res.json(stock);
  } catch (error) {
    next(error);
  }
};

// Create or update stock entry
const createStock = async (req, res, next) => {
  try {
    const { productId, locationId, quantity } = req.body;

    if (!productId || !locationId || quantity === undefined) {
      return res.status(400).json({ error: 'Product ID, Location ID, and quantity are required' });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if location exists
    const location = await prisma.location.findUnique({
      where: { id: locationId }
    });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Use upsert to create or update stock
    const stock = await prisma.stock.upsert({
      where: {
        productId_locationId: {
          productId,
          locationId
        }
      },
      update: {
        quantity
      },
      create: {
        productId,
        locationId,
        quantity
      },
      include: {
        product: true,
        location: true
      }
    });

    res.status(201).json(stock);
  } catch (error) {
    next(error);
  }
};

// Update stock quantity
const updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ error: 'Quantity is required' });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }

    const stock = await prisma.stock.update({
      where: { id: parseInt(id) },
      data: { quantity },
      include: {
        product: true,
        location: true
      }
    });

    res.json(stock);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Stock entry not found' });
    }
    next(error);
  }
};

module.exports = {
  getAllStock,
  getStockByProduct,
  getStockByLocation,
  createStock,
  updateStock
};
