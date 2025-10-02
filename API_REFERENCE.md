# API Routes Reference

## Base URL
```
http://localhost:3000
```

## Endpoints Summary

### Root
- `GET /` - API information and available endpoints

### Products
- `GET /api/products` - Get all products with their stock information
- `GET /api/products/:id` - Get a specific product with stock details
- `GET /api/products/:id/availability` - Get product availability across all locations
- `POST /api/products` - Create a new product (requires: name, sku)
- `PUT /api/products/:id` - Update a product

### Locations
- `GET /api/locations` - Get all locations with their stock information
- `GET /api/locations/:id` - Get a specific location with stock details
- `POST /api/locations` - Create a new location (requires: name)
- `PUT /api/locations/:id` - Update a location

### Stock
- `GET /api/stock` - Get all stock entries
- `GET /api/stock/product/:productId` - Get stock for a specific product
- `GET /api/stock/location/:locationId` - Get stock for a specific location
- `POST /api/stock` - Create or update stock entry (requires: productId, locationId, quantity)
- `PUT /api/stock/:id` - Update stock quantity (requires: quantity)

## Request/Response Examples

### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "sku": "PROD-001"
}

Response: 201 Created
{
  "id": 1,
  "name": "Product Name",
  "description": "Product Description",
  "sku": "PROD-001",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Check Product Availability
```
GET /api/products/1/availability

Response: 200 OK
{
  "productId": 1,
  "productName": "Product Name",
  "sku": "PROD-001",
  "availability": [
    {
      "location": "Location Name",
      "address": "123 Street",
      "city": "City",
      "country": "Country",
      "quantity": 50,
      "available": true
    }
  ]
}
```

### Add/Update Stock
```
POST /api/stock
Content-Type: application/json

{
  "productId": 1,
  "locationId": 1,
  "quantity": 100
}

Response: 201 Created
{
  "id": 1,
  "productId": 1,
  "locationId": 1,
  "quantity": 100,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "product": {...},
  "location": {...}
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Name and SKU are required"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details..."
}
```

## Data Validation

### Product
- `name`: Required, string
- `description`: Optional, string
- `sku`: Required, string, unique

### Location
- `name`: Required, string
- `address`: Optional, string
- `city`: Optional, string
- `country`: Optional, string

### Stock
- `productId`: Required, integer, must exist
- `locationId`: Required, integer, must exist
- `quantity`: Required, integer, cannot be negative
- Unique constraint: One stock entry per product-location pair
