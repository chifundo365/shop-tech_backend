# Shop Tech Backend - Project Summary

## Overview
This is a complete Node.js/Express backend for a products availability and stock tracking system. The system allows customers to check which products are available at different locations and view real-time stock quantities.

## Technology Stack
- **Runtime**: Node.js v14+
- **Framework**: Express.js v5
- **Database**: PostgreSQL
- **ORM**: Prisma v6
- **Other**: dotenv (config), CORS (security), nodemon (dev)

## Project Structure

```
shop-tech_backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── productController.js
│   │   ├── locationController.js
│   │   └── stockController.js
│   ├── routes/              # API route definitions
│   │   ├── products.js
│   │   ├── locations.js
│   │   └── stock.js
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.js
│   ├── prisma.js           # Prisma client instance
│   └── server.js           # Main application entry point
├── prisma/
│   ├── schema.prisma       # Database schema definition
│   └── seed.js            # Sample data seeder
├── API_TESTING.md         # Testing guide with curl examples
├── API_REFERENCE.md       # Quick API reference
├── docker-compose.yml     # PostgreSQL Docker setup
├── .env.example          # Environment variables template
└── README.md            # Full documentation

```

## Database Schema

### Product Table
- Stores product information (name, description, SKU)
- SKU is unique identifier for each product
- Has one-to-many relationship with Stock

### Location Table
- Stores location information (name, address, city, country)
- Represents warehouses, stores, or distribution centers
- Has one-to-many relationship with Stock

### Stock Table
- Links products to locations with quantity
- Tracks how many units of each product are at each location
- Enforces unique constraint on (productId, locationId) pair
- Cannot have negative quantities

## Key Features

### 1. Product Management
- Create products with unique SKU
- View all products with their stock across all locations
- Update product information
- Check product availability at all locations

### 2. Location Management
- Create and manage storage/retail locations
- View all locations with their inventory
- Update location details

### 3. Stock Tracking
- Add or update stock quantities
- Query stock by product or location
- Automatic upsert (create or update) functionality
- Real-time inventory visibility

### 4. Availability Checking
- Special endpoint to show customers where products are available
- Shows quantity at each location
- Indicates availability status (available/not available)

## API Endpoints (11 total)

### Products (5 endpoints)
1. GET /api/products - List all products
2. GET /api/products/:id - Get product details
3. GET /api/products/:id/availability - Check availability
4. POST /api/products - Create product
5. PUT /api/products/:id - Update product

### Locations (4 endpoints)
1. GET /api/locations - List all locations
2. GET /api/locations/:id - Get location details
3. POST /api/locations - Create location
4. PUT /api/locations/:id - Update location

### Stock (5 endpoints)
1. GET /api/stock - List all stock
2. GET /api/stock/product/:productId - Get stock by product
3. GET /api/stock/location/:locationId - Get stock by location
4. POST /api/stock - Create/update stock
5. PUT /api/stock/:id - Update stock quantity

## Setup Instructions

### Quick Start (3 steps)
1. Clone and install: `git clone <repo> && cd shop-tech_backend && npm install`
2. Setup database: `docker-compose up -d && npm run prisma:migrate`
3. Run: `npm run dev`

### Detailed Setup
See README.md for complete installation and configuration instructions.

## Development Tools

### NPM Scripts
- `npm start` - Start production server
- `npm run dev` - Start with auto-reload (nodemon)
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open database GUI
- `npm run prisma:seed` - Populate with sample data

### Docker Support
- Includes docker-compose.yml for PostgreSQL
- Pre-configured with credentials
- Persistent volume for data

### Sample Data
- Seed script includes 5 products, 3 locations, 15 stock entries
- Ready-to-test data for demonstrations
- Run with: `npm run prisma:seed`

## Error Handling

### Validation Errors (400)
- Missing required fields
- Negative quantities
- Duplicate SKUs

### Not Found Errors (404)
- Product not found
- Location not found
- Stock entry not found

### Database Errors (400/500)
- Prisma errors are caught and formatted
- Clear error messages for debugging

## Testing

### Manual Testing
- API_TESTING.md provides curl commands for all endpoints
- Complete test sequence from setup to queries
- Sample data included

### Integration Testing
- Connect to database with Prisma
- All endpoints tested with real data
- Error scenarios covered

## Production Readiness

### Security
- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- SQL injection protection via Prisma

### Performance
- Database indexes on foreign keys
- Efficient queries with Prisma include statements
- Async/await for non-blocking operations

### Scalability
- Stateless API design
- Database handles concurrency
- Easy to containerize and deploy

## Future Enhancements (Optional)

### Possible Additions
- Authentication and authorization
- Product categories and tags
- Stock history/audit trail
- Low stock alerts
- Bulk operations
- Search and filtering
- Pagination for large datasets
- Rate limiting
- API documentation with Swagger/OpenAPI
- Unit and integration tests
- CI/CD pipeline
- Monitoring and logging

## Use Cases

### Retail Chain
Track inventory across multiple store locations

### E-commerce
Show customers which warehouse has stock

### Distribution
Manage products across distribution centers

### Warehouse Management
Monitor stock levels and locations

## License
MIT License - See LICENSE file

## Author
chifundo biziweck

## Support
For issues, please check:
1. README.md for setup instructions
2. API_TESTING.md for testing examples
3. API_REFERENCE.md for endpoint details
