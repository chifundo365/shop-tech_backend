import prisma from '../src/prismaClient'

async function main() {
  console.log('Seeding database...')

  // Clear existing data (in dependency order) so the script is idempotent
  await prisma.order_items.deleteMany()
  await prisma.payments.deleteMany()
  await prisma.orders.deleteMany()
  await prisma.reviews.deleteMany()
  await prisma.shop_products_log.deleteMany()
  await prisma.shop_products.deleteMany()
  await prisma.products.deleteMany()
  await prisma.shops.deleteMany()
  await prisma.user_addresses.deleteMany()
  await prisma.categories.deleteMany()
  await prisma.users.deleteMany()

  // Users
  const users = []
  for (let i = 1; i <= 3; i++) {
    users.push(
      prisma.users.create({
        data: {
          full_name: `Test User ${i}`,
          email: `user${i}@example.com`,
          password_hash: `hash${i}`,
        },
      })
    )
  }

  const createdUsers = await Promise.all(users)

  // Categories
  const categories = []
  for (let i = 1; i <= 3; i++) {
    categories.push(
      prisma.categories.create({
        data: { name: `Category ${i}`, description: `Category ${i} description` },
      })
    )
  }
  const createdCategories = await Promise.all(categories)

  // Products
  const products = []
  for (let i = 1; i <= 3; i++) {
    products.push(
      prisma.products.create({
        data: {
          name: `Product ${i}`,
          brand: `Brand ${i}`,
          category_id: createdCategories[i - 1].id,
          base_price: '9.99',
          images: [],
        },
      })
    )
  }
  const createdProducts = await Promise.all(products)

  // Shops
  const shops = []
  for (let i = 1; i <= 3; i++) {
    shops.push(
      prisma.shops.create({
        data: {
          name: `Shop ${i}`,
          owner_id: createdUsers[i - 1].id,
        },
      })
    )
  }
  const createdShops = await Promise.all(shops)

  // Shop products
  const shopProducts = []
  for (let i = 1; i <= 3; i++) {
    shopProducts.push(
      prisma.shop_products.create({
        data: {
          shop_id: createdShops[i - 1].id,
          product_id: createdProducts[i - 1].id,
          price: '12.50',
          stock_quantity: 10,
          images: [],
        },
      })
    )
  }
  const createdShopProducts = await Promise.all(shopProducts)

  // Orders + order_items + payments
  const orders = []
  for (let i = 1; i <= 3; i++) {
    orders.push(
      prisma.orders.create({
        data: {
          order_number: `ORD-000${i}`,
          buyer_id: createdUsers[i - 1].id,
          shop_id: createdShops[i - 1].id,
          total_amount: '12.50',
          order_items: {
            create: [
              {
                product_name: createdProducts[i - 1].name,
                quantity: 1,
                unit_price: '12.50',
                total_price: '12.50',
                shop_product_id: createdShopProducts[i - 1].id,
              },
            ],
          },
          payments: {
            create: [
              { payment_method: 'CARD', amount: '12.50', status: 'PAID' },
            ],
          },
        },
      })
    )
  }

  const createdOrders = await Promise.all(orders)

  // Reviews
  const reviews = []
  for (let i = 1; i <= 3; i++) {
    reviews.push(
      prisma.reviews.create({
        data: {
          reviewer_id: createdUsers[i - 1].id,
          shop_id: createdShops[i - 1].id,
          product_id: createdProducts[i - 1].id,
          rating: 5,
          comment: `Great product ${i}`,
        },
      })
    )
  }
  await Promise.all(reviews)

  // Addresses
  const addresses = []
  for (let i = 1; i <= 3; i++) {
    addresses.push(
      prisma.user_addresses.create({
        data: {
          user_id: createdUsers[i - 1].id,
          contact_name: createdUsers[i - 1].full_name,
          address_line1: `123 Test St ${i}`,
          city: 'Testville',
        },
      })
    )
  }
  await Promise.all(addresses)

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
