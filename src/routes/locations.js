const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation
} = require('../controllers/locationController');

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);

module.exports = router;
