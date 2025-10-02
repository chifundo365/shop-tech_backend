# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  (Web/Mobile Apps, API Consumers, Testing Tools)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/JSON
                              │
┌─────────────────────────────────────────────────────────────┐
│                     EXPRESS SERVER (Port 3000)               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware Layer                                     │  │
│  │  • CORS                                              │  │
│  │  • JSON Parser                                       │  │
│  │  • Error Handler                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes Layer                                        │  │
│  │  • /api/products                                     │  │
│  │  • /api/locations                                    │  │
│  │  • /api/stock                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers Layer                                   │  │
│  │  • productController                                 │  │
│  │  • locationController                                │  │
│  │  • stockController                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              │
┌─────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Product    │  │   Location   │  │    Stock     │     │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤     │
│  │ id           │  │ id           │  │ id           │     │
│  │ name         │  │ name         │  │ productId  ──┼──┐  │
│  │ description  │  │ address      │  │ locationId ──┼─┐│  │
│  │ sku (unique) │  │ city         │  │ quantity     │ ││  │
│  │ createdAt    │  │ country      │  │ createdAt    │ ││  │
│  │ updatedAt    │  │ createdAt    │  │ updatedAt    │ ││  │
│  └──────────────┘  │ updatedAt    │  └──────────────┘ ││  │
│         │          └──────────────┘         │         ││  │
│         └────────────────┬──────────────────┘         ││  │
│                          └────────────────────────────┘│  │
│                                                         │  │
│  Relationships:                                        │  │
│  • Product 1:N Stock                                   │  │
│  • Location 1:N Stock                                  │  │
│  • Unique constraint: (productId, locationId)         │  │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### Example: Check Product Availability

```
1. Client Request
   GET /api/products/1/availability
   
2. Express Router
   Routes to: productController.getProductAvailability
   
3. Controller Logic
   • Validates product ID
   • Queries Prisma for product with related stock and locations
   
4. Prisma ORM
   • Translates to SQL query
   • Joins Product, Stock, and Location tables
   • Returns structured data
   
5. Controller Processing
   • Formats data for client
   • Adds availability flags
   • Structures response
   
6. Response to Client
   {
     "productId": 1,
     "productName": "Premium Laptop",
     "sku": "LAP-001",
     "availability": [
       {
         "location": "Main Warehouse",
         "quantity": 50,
         "available": true
       },
       ...
     ]
   }
```

## Data Flow Diagram

```
CREATE PRODUCT          CREATE LOCATION         ADD STOCK
     │                        │                      │
     ▼                        ▼                      ▼
┌─────────┐            ┌─────────┐            ┌─────────┐
│ Product │            │Location │            │  Stock  │
│  Table  │            │  Table  │            │  Table  │
└─────────┘            └─────────┘            └─────────┘
     │                        │                      │
     └────────────────────────┴──────────────────────┘
                              │
                              ▼
                    CHECK AVAILABILITY
                              │
                              ▼
                      ┌───────────────┐
                      │  JOIN QUERY   │
                      │  All 3 Tables │
                      └───────────────┘
                              │
                              ▼
                    RETURN AVAILABILITY
                       TO CUSTOMER
```

## API Endpoint Categories

### Product Endpoints
```
GET    /api/products              → List all products
GET    /api/products/:id          → Get one product
GET    /api/products/:id/availability → Check where available
POST   /api/products              → Create product
PUT    /api/products/:id          → Update product
```

### Location Endpoints
```
GET    /api/locations             → List all locations
GET    /api/locations/:id         → Get one location
POST   /api/locations             → Create location
PUT    /api/locations/:id         → Update location
```

### Stock Endpoints
```
GET    /api/stock                      → List all stock
GET    /api/stock/product/:productId   → Stock for product
GET    /api/stock/location/:locationId → Stock at location
POST   /api/stock                      → Add/update stock
PUT    /api/stock/:id                  → Update quantity
```

## Technology Stack Details

```
┌─────────────────────────────────────┐
│         Application Layer           │
│  • Node.js (Runtime)               │
│  • Express.js (Web Framework)      │
└─────────────────────────────────────┘
                 │
┌─────────────────────────────────────┐
│         Data Access Layer           │
│  • Prisma (ORM)                    │
│  • @prisma/client                  │
└─────────────────────────────────────┘
                 │
┌─────────────────────────────────────┐
│         Database Layer              │
│  • PostgreSQL (RDBMS)              │
└─────────────────────────────────────┘
```

## Deployment Options

### Development
```
Local Machine
├── PostgreSQL (Docker)
├── Node.js Server
└── Environment: .env file
```

### Production
```
Cloud Deployment Options:
├── Heroku (with Heroku Postgres)
├── AWS (EC2 + RDS PostgreSQL)
├── DigitalOcean (Droplet + Managed Database)
├── Vercel/Railway (with external PostgreSQL)
└── Docker containers (Kubernetes/ECS)
```

## Security Considerations

1. **Environment Variables**: Sensitive data in .env (not committed)
2. **CORS**: Configured for cross-origin requests
3. **Prisma**: Protection against SQL injection
4. **Validation**: Input validation in controllers
5. **Error Handling**: No sensitive data in error messages

## Scalability Considerations

1. **Stateless API**: Can run multiple instances
2. **Database Indexes**: Optimized queries
3. **Connection Pooling**: Prisma manages connections
4. **Horizontal Scaling**: Add more server instances
5. **Database Scaling**: PostgreSQL read replicas

## Monitoring Points

1. **API Response Times**: Track endpoint performance
2. **Database Queries**: Monitor slow queries
3. **Error Rates**: Track 4xx and 5xx responses
4. **Stock Levels**: Alert on low inventory
5. **System Resources**: CPU, memory, connections
