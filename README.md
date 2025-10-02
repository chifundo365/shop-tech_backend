# shop-tech_backend

A Node.js/Express backend for a products availability and stock tracking system. This system allows customers to view which products are available, at what locations, and how many are in stock.

## Features

- **Product Management**: Create, read, and update product information
- **Location Management**: Manage multiple store/warehouse locations
- **Stock Tracking**: Track inventory levels for each product at each location
- **Availability Check**: Query product availability across all locations
- **RESTful API**: Clean, well-documented API endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM (Object-Relational Mapping)
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chifundo365/shop-tech_backend.git
cd shop-tech_backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/shop_tech?schema=public"
PORT=3000
NODE_ENV=development
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in .env)

## API Endpoints

### Products

- **GET /api/products** - Get all products
- **GET /api/products/:id** - Get a specific product by ID
- **GET /api/products/:id/availability** - Get product availability across all locations
- **POST /api/products** - Create a new product
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "sku": "PROD-001"
  }
  ```
- **PUT /api/products/:id** - Update a product

### Locations

- **GET /api/locations** - Get all locations
- **GET /api/locations/:id** - Get a specific location by ID
- **POST /api/locations** - Create a new location
  ```json
  {
    "name": "Store Name",
    "address": "123 Main St",
    "city": "City",
    "country": "Country"
  }
  ```
- **PUT /api/locations/:id** - Update a location

### Stock

- **GET /api/stock** - Get all stock entries
- **GET /api/stock/product/:productId** - Get stock for a specific product
- **GET /api/stock/location/:locationId** - Get stock for a specific location
- **POST /api/stock** - Create or update stock entry
  ```json
  {
    "productId": 1,
    "locationId": 1,
    "quantity": 100
  }
  ```
- **PUT /api/stock/:id** - Update stock quantity
  ```json
  {
    "quantity": 50
  }
  ```

## Database Schema

### Product
- `id` (Int, Primary Key)
- `name` (String)
- `description` (String, Optional)
- `sku` (String, Unique)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Location
- `id` (Int, Primary Key)
- `name` (String)
- `address` (String, Optional)
- `city` (String, Optional)
- `country` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Stock
- `id` (Int, Primary Key)
- `productId` (Int, Foreign Key)
- `locationId` (Int, Foreign Key)
- `quantity` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Development

### View Database with Prisma Studio:
```bash
npm run prisma:studio
```

This will open a browser interface to view and edit your database.

### Create a new migration:
```bash
npm run prisma:migrate
```

## Example Usage

1. **Create a location:**
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

2. **Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "sku": "LAP-001"
  }'
```

3. **Add stock:**
```bash
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "locationId": 1,
    "quantity": 50
  }'
```

4. **Check product availability:**
```bash
curl http://localhost:3000/api/products/1/availability
```

## License

MIT License - see LICENSE file for details

## Author

chifundo biziweck
