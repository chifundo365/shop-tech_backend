const prisma = require('../prisma');

// Get all locations
const getAllLocations = async (req, res, next) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        stock: {
          include: {
            product: true
          }
        }
      }
    });
    res.json(locations);
  } catch (error) {
    next(error);
  }
};

// Get a single location
const getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await prisma.location.findUnique({
      where: { id: parseInt(id) },
      include: {
        stock: {
          include: {
            product: true
          }
        }
      }
    });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    next(error);
  }
};

// Create a new location
const createLocation = async (req, res, next) => {
  try {
    const { name, address, city, country } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const location = await prisma.location.create({
      data: {
        name,
        address,
        city,
        country
      }
    });

    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
};

// Update a location
const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, city, country } = req.body;

    const location = await prisma.location.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country })
      }
    });

    res.json(location);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Location not found' });
    }
    next(error);
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation
};
