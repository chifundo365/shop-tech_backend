const express = require('express');
const router = express.Router();
const {
  getAllStock,
  getStockByProduct,
  getStockByLocation,
  createStock,
  updateStock
} = require('../controllers/stockController');

router.get('/', getAllStock);
router.get('/product/:productId', getStockByProduct);
router.get('/location/:locationId', getStockByLocation);
router.post('/', createStock);
router.put('/:id', updateStock);

module.exports = router;
