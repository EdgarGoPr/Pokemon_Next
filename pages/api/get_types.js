import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const TY = await prisma.Type.findMany();
      const num = TY.length
      res.status(200).json({ message: 'Fetch successful', total: num, data: TY })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}