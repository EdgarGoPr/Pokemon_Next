import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const PK = await prisma.Pokemon.findMany();
      const num = PK.length;
      res.status(200).json({ message: 'Fetch successful', total: num, data: PK });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
