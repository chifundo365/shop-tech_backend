# API Testing Guide

This guide shows how to test the Shop Tech Backend API endpoints using curl or any HTTP client.

## Prerequisites

1. Database must be set up and running
2. Run migrations: `npm run prisma:migrate`
3. Start the server: `npm run dev`

## Test Sequence

### 1. Health Check
```bash
curl http://localhost:3000/
```

Expected response:
```json
{
  "message": "Shop Tech Backend API",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products",
    "locations": "/api/locations",
    "stock": "/api/stock"
  }
}
```

### 2. Create Locations

Create first location (Main Warehouse):
```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Warehouse",
    "address": "123 Storage St",
    "city": "New York",
    "country": "USA"
  }'
```

Create second location (Retail Store):
```bash
curl -X POST http://localhost:3000/api/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Downtown Retail Store",
    "address": "456 Shopping Ave",
    "city": "Los Angeles",
    "country": "USA"
  }'
```

### 3. Get All Locations
```bash
curl http://localhost:3000/api/locations
```

### 4. Create Products

Create first product (Laptop):
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "sku": "LAP-001"
  }'
```

Create second product (Mouse):
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "sku": "MOU-001"
  }'
```

Create third product (Keyboard):
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard",
    "sku": "KEY-001"
  }'
```

### 5. Get All Products
```bash
curl http://localhost:3000/api/products
```

### 6. Add Stock

Add laptop stock to Main Warehouse:
```bash
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "locationId": 1,
    "quantity": 50
  }'
```

Add laptop stock to Retail Store:
```bash
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "locationId": 2,
    "quantity": 15
  }'
```

Add mouse stock:
```bash
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 2,
    "locationId": 1,
    "quantity": 200
  }'
```

Add keyboard stock:
```bash
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 3,
    "locationId": 2,
    "quantity": 30
  }'
```

### 7. Get Product Availability

Check laptop availability across all locations:
```bash
curl http://localhost:3000/api/products/1/availability
```

Expected response:
```json
{
  "productId": 1,
  "productName": "Premium Laptop",
  "sku": "LAP-001",
  "availability": [
    {
      "location": "Main Warehouse",
      "address": "123 Storage St",
      "city": "New York",
      "country": "USA",
      "quantity": 50,
      "available": true
    },
    {
      "location": "Downtown Retail Store",
      "address": "456 Shopping Ave",
      "city": "Los Angeles",
      "country": "USA",
      "quantity": 15,
      "available": true
    }
  ]
}
```

### 8. Get All Stock
```bash
curl http://localhost:3000/api/stock
```

### 9. Get Stock by Product
```bash
curl http://localhost:3000/api/stock/product/1
```

### 10. Get Stock by Location
```bash
curl http://localhost:3000/api/stock/location/1
```

### 11. Update Stock Quantity
```bash
curl -X PUT http://localhost:3000/api/stock/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 45
  }'
```

### 12. Update Product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Gaming Laptop",
    "description": "High-performance gaming laptop with 32GB RAM"
  }'
```

### 13. Get Specific Product
```bash
curl http://localhost:3000/api/products/1
```

## Testing with Postman

Import these requests into Postman or use the Postman collection format:

1. Create a new collection named "Shop Tech API"
2. Set the base URL as a collection variable: `{{baseUrl}}` = `http://localhost:3000`
3. Import the endpoints listed above

## Testing with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create a new collection
3. Add the endpoints from this guide

## Notes

- All POST and PUT requests require `Content-Type: application/json` header
- Product IDs and Location IDs start from 1 and increment
- Stock entries are unique per product-location combination
- Creating stock with the same productId and locationId will update existing stock
- Quantity cannot be negative
- SKU must be unique for each product
