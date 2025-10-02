const prisma = require('../prisma');

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        stock: {
          include: {
            location: true
          }
        }
      }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get a single product
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        stock: {
          include: {
            location: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Get product availability by location
const getProductAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        stock: {
          include: {
            location: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const availability = product.stock.map(s => ({
      location: s.location.name,
      address: s.location.address,
      city: s.location.city,
      country: s.location.country,
      quantity: s.quantity,
      available: s.quantity > 0
    }));

    res.json({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      availability
    });
  } catch (error) {
    next(error);
  }
};

// Create a new product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, sku } = req.body;

    if (!name || !sku) {
      return res.status(400).json({ error: 'Name and SKU are required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        sku
      }
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    next(error);
  }
};

// Update a product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, sku } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(sku && { sku })
      }
    });

    res.json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductAvailability,
  createProduct,
  updateProduct
};
