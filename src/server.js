require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const productsRouter = require('./routes/products');
const locationsRouter = require('./routes/locations');
const stockRouter = require('./routes/stock');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Shop Tech Backend API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      locations: '/api/locations',
      stock: '/api/stock'
    }
  });
});

app.use('/api/products', productsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/stock', stockRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
