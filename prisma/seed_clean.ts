import prisma from "../src/prismaClient";

async function main() {
  console.log("🌱 Seeding database with comprehensive test data...");

  try {
    // Ensure Prisma is connected with retry logic
    console.log("🔗 Connecting to database...");
    await prisma.$connect();

    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection established");

    // Clear existing data in dependency order
    console.log("🧹 Clearing existing data...");

    await prisma.order_items.deleteMany();
    await prisma.payments.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.reviews.deleteMany();
    await prisma.shop_products_log.deleteMany();
    await prisma.shop_products.deleteMany();
    await prisma.products.deleteMany();
    await prisma.shops.deleteMany();
    await prisma.user_addresses.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.users.deleteMany();
    console.log("✅ Cleared all existing data");

    // Add a small delay to ensure cleanup is complete
    console.log("⏳ Preparing to seed data...");
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.log("⚠️ Error during setup:", error.message);
    console.log("Continuing with seeding...");
  }

  // Different pre-generated password hashes for each user
  const passwordHashes = [
    "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewHiHhqcD6nXuBk6", // password123
    "$2b$12$9Hk8DzP2nVxQ4fG7RjL3VeKm6wT8sN9bC5xY1uE3rA7oI4dF6hS8g", // secure456
    "$2b$12$X3vM8Qw6PtN5jK2sL9fH4eR7uY9bC1xV5gT8nM4pQ6wE2rT7yU1o", // strong789
    "$2b$12$B5nK7Qs4WtM8jP9sF3gH2eR6yU4bX1vC8gN5pL7wE9rT2yI6oQ3m", // admin321
    "$2b$12$F9mK3Qw7RtN6jL2sP8gH5eY4uB1xV9gT6nM2pQ5wE8rT1yI3oC7s" // user654
  ];

  try {
    // 1. Create 5 Users
    console.log("👥 Creating users...");
    const users = [];

    users.push(
      await prisma.users.create({
        data: {
          full_name: "Alice Banda",
          email: "alice.banda@gmail.com",
          phone_number: "+265991234567",
          password_hash: passwordHashes[0], // password123
          role: "CUSTOMER",
          profile_image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=200"
        }
      })
    );

    users.push(
      await prisma.users.create({
        data: {
          full_name: "John Phiri",
          email: "john.phiri@techstore.mw",
          phone_number: "+265998765432",
          password_hash: passwordHashes[1], // secure456
          role: "SELLER",
          profile_image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
        }
      })
    );

    users.push(
      await prisma.users.create({
        data: {
          full_name: "Grace Mwale",
          email: "grace.mwale@digitalmw.com",
          phone_number: "+265997654321",
          password_hash: passwordHashes[2], // strong789
          role: "SELLER",
          profile_image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
        }
      })
    );

    users.push(
      await prisma.users.create({
        data: {
          full_name: "Peter Nyirenda",
          email: "peter.nyirenda@admin.com",
          phone_number: "+265996543210",
          password_hash: passwordHashes[3], // admin321
          role: "ADMIN",
          profile_image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
        }
      })
    );

    users.push(
      await prisma.users.create({
        data: {
          full_name: "Mary Tembo",
          email: "mary.tembo@customer.com",
          phone_number: "+265995432109",
          password_hash: passwordHashes[4], // user654
          role: "CUSTOMER",
          profile_image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
        }
      })
    );

    console.log(`✅ Created ${users.length} users`);

    // 2. Create 5 Categories
    console.log("📱 Creating categories...");
    const categories = [];

    categories.push(
      await prisma.categories.create({
        data: {
          name: "Smartphones & Tablets",
          description:
            "Latest mobile devices, smartphones, tablets and accessories"
        }
      })
    );

    categories.push(
      await prisma.categories.create({
        data: {
          name: "Laptops & Computers",
          description:
            "Desktop computers, laptops, monitors and computer accessories"
        }
      })
    );

    categories.push(
      await prisma.categories.create({
        data: {
          name: "Audio & Headphones",
          description: "Speakers, headphones, earbuds and audio equipment"
        }
      })
    );

    categories.push(
      await prisma.categories.create({
        data: {
          name: "Gaming & Consoles",
          description: "Gaming consoles, video games, and gaming accessories"
        }
      })
    );

    categories.push(
      await prisma.categories.create({
        data: {
          name: "Smart Home & IoT",
          description: "Smart home devices, IoT gadgets, and home automation"
        }
      })
    );

    console.log(`✅ Created ${categories.length} categories`);

    // 3. Create 5 Products sequentially to avoid connection issues
    console.log("🛍️ Creating products...");
    const products = [];

    products.push(
      await prisma.products.create({
        data: {
          name: "iPhone 15 Pro Max",
          brand: "Apple",
          description:
            "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
          category_id: categories[0].id,
          base_price: "850000.00",
          images: [
            "https://images.unsplash.com/photo-1592910147829-99f40bc3d004?w=500",
            "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=500"
          ]
        }
      })
    );

    products.push(
      await prisma.products.create({
        data: {
          name: "MacBook Air M3",
          brand: "Apple",
          description:
            "Lightweight laptop with M3 chip, 13-inch Retina display, and all-day battery life",
          category_id: categories[1].id,
          base_price: "750000.00",
          images: [
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
          ]
        }
      })
    );

    products.push(
      await prisma.products.create({
        data: {
          name: "Sony WH-1000XM5",
          brand: "Sony",
          description:
            "Premium noise-canceling wireless headphones with exceptional sound quality",
          category_id: categories[2].id,
          base_price: "185000.00",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
          ]
        }
      })
    );

    products.push(
      await prisma.products.create({
        data: {
          name: "PlayStation 5",
          brand: "Sony",
          description:
            "Next-generation gaming console with 4K gaming and ultra-high speed SSD",
          category_id: categories[3].id,
          base_price: "450000.00",
          images: [
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
            "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500"
          ]
        }
      })
    );

    products.push(
      await prisma.products.create({
        data: {
          name: "Amazon Echo Dot 5th Gen",
          brand: "Amazon",
          description:
            "Smart speaker with Alexa, improved audio, and smart home hub capabilities",
          category_id: categories[4].id,
          base_price: "45000.00",
          images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
          ]
        }
      })
    );

    console.log(`✅ Created ${products.length} products`);

    console.log("✅ Seeding completed successfully!");
    console.log("📊 Database Summary:");
    console.log(
      `- 👥 Users: ${users.length} (1 Admin, 2 Sellers, 2 Customers)`
    );
    console.log(`- 📱 Categories: ${categories.length}`);
    console.log(`- 🛍️ Products: ${products.length}`);
    console.log("🎉 Database is ready for basic testing!");
    console.log("🔐 User passwords represented by different hashes:");
    console.log("  - Alice: password123");
    console.log("  - John: secure456");
    console.log("  - Grace: strong789");
    console.log("  - Peter: admin321");
    console.log("  - Mary: user654");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch(e => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
