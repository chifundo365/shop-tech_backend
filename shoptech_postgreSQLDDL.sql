-- ------------------------------
-- ENUMS
-- ------------------------------
CREATE TYPE user_role AS ENUM ('USER', 'SELLER', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- ------------------------------
-- TABLE: User
-- ------------------------------
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------
-- TABLE: Shop
-- ------------------------------
CREATE TABLE "Shop" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    lat FLOAT,
    lng FLOAT,
    images TEXT[],
    is_individual BOOLEAN NOT NULL DEFAULT FALSE,
    registration_number TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    owner_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_shop_owner FOREIGN KEY(owner_id) REFERENCES "User"(id) ON DELETE SET NULL
);

-- ------------------------------
-- TABLE: Product
-- ------------------------------
CREATE TABLE "Product" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT,
    category TEXT,
    description TEXT,
    images TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------
-- TABLE: ShopProduct (Join Table)
-- ------------------------------
CREATE TABLE "ShopProduct" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL,
    product_id UUID NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_shpprod_shop FOREIGN KEY(shop_id) REFERENCES "Shop"(id) ON DELETE CASCADE,
    CONSTRAINT fk_shpprod_product FOREIGN KEY(product_id) REFERENCES "Product"(id) ON DELETE CASCADE,
    CONSTRAINT unique_shop_product UNIQUE(shop_id, product_id)
);

-- ------------------------------
-- TABLE: Order
-- ------------------------------
CREATE TABLE "Order" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL,
    shop_id UUID NOT NULL,
    total_price DECIMAL NOT NULL,
    status order_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_order_buyer FOREIGN KEY(buyer_id) REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_shop FOREIGN KEY(shop_id) REFERENCES "Shop"(id) ON DELETE CASCADE
);
