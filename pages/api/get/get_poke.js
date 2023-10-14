import prisma from "../utils/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.Pokemon.findMany({
        where: {
          isActive: true,
        }
      });
      const num = data.length;
      res.status(200).json({ message: 'Fetch successful', total: num, data: data });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
