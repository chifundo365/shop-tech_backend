const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductAvailability,
  createProduct,
  updateProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/availability', getProductAvailability);
router.post('/', createProduct);
router.put('/:id', updateProduct);

module.exports = router;
