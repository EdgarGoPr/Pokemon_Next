import prisma from "../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const data = await prisma.pokemon.findUnique({
        where: { id }
      })
      res.status(200).json({ message: 'Fetch successful', data: data })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
