import { PrismaClient } from '../generated/prisma'

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}

async function main() {
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export default prisma