const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create locations
  const warehouse = await prisma.location.create({
    data: {
      name: 'Main Warehouse',
      address: '123 Storage St',
      city: 'New York',
      country: 'USA'
    }
  });
  console.log('Created location:', warehouse.name);

  const retailStore = await prisma.location.create({
    data: {
      name: 'Downtown Retail Store',
      address: '456 Shopping Ave',
      city: 'Los Angeles',
      country: 'USA'
    }
  });
  console.log('Created location:', retailStore.name);

  const onlineStore = await prisma.location.create({
    data: {
      name: 'Online Store Fulfillment Center',
      address: '789 Distribution Blvd',
      city: 'Chicago',
      country: 'USA'
    }
  });
  console.log('Created location:', onlineStore.name);

  // Create products
  const laptop = await prisma.product.create({
    data: {
      name: 'Premium Laptop',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD',
      sku: 'LAP-001'
    }
  });
  console.log('Created product:', laptop.name);

  const mouse = await prisma.product.create({
    data: {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with 3 buttons',
      sku: 'MOU-001'
    }
  });
  console.log('Created product:', mouse.name);

  const keyboard = await prisma.product.create({
    data: {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with blue switches',
      sku: 'KEY-001'
    }
  });
  console.log('Created product:', keyboard.name);

  const monitor = await prisma.product.create({
    data: {
      name: '27" 4K Monitor',
      description: 'Ultra HD 4K monitor with HDR support',
      sku: 'MON-001'
    }
  });
  console.log('Created product:', monitor.name);

  const headphones = await prisma.product.create({
    data: {
      name: 'Noise-Canceling Headphones',
      description: 'Premium wireless headphones with active noise cancellation',
      sku: 'HEAD-001'
    }
  });
  console.log('Created product:', headphones.name);

  // Create stock entries
  const stockEntries = [
    // Laptops
    { productId: laptop.id, locationId: warehouse.id, quantity: 50 },
    { productId: laptop.id, locationId: retailStore.id, quantity: 15 },
    { productId: laptop.id, locationId: onlineStore.id, quantity: 100 },
    
    // Mice
    { productId: mouse.id, locationId: warehouse.id, quantity: 200 },
    { productId: mouse.id, locationId: retailStore.id, quantity: 45 },
    { productId: mouse.id, locationId: onlineStore.id, quantity: 150 },
    
    // Keyboards
    { productId: keyboard.id, locationId: warehouse.id, quantity: 75 },
    { productId: keyboard.id, locationId: retailStore.id, quantity: 30 },
    { productId: keyboard.id, locationId: onlineStore.id, quantity: 90 },
    
    // Monitors
    { productId: monitor.id, locationId: warehouse.id, quantity: 40 },
    { productId: monitor.id, locationId: retailStore.id, quantity: 10 },
    { productId: monitor.id, locationId: onlineStore.id, quantity: 60 },
    
    // Headphones
    { productId: headphones.id, locationId: warehouse.id, quantity: 120 },
    { productId: headphones.id, locationId: retailStore.id, quantity: 35 },
    { productId: headphones.id, locationId: onlineStore.id, quantity: 80 }
  ];

  for (const stock of stockEntries) {
    await prisma.stock.create({ data: stock });
  }
  console.log(`Created ${stockEntries.length} stock entries`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
