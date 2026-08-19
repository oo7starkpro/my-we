import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.menuItem.deleteMany()
  await prisma.restaurant.deleteMany()

  await prisma.restaurant.create({
    data: {
      name: 'Campus Cafe',
      address: 'Hostel Block',
      isOpen: true,
      menu: {
        create: [
          {
            name: 'Veg Sandwich',
            price: 60,
            description: 'Fresh veg sandwich',
            isAvailable: true,
          },
          {
            name: 'Cold Coffee',
            price: 80,
            description: 'Chilled coffee',
            isAvailable: true,
          },
        ],
      },
    },
  })

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
