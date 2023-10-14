import prisma from "../utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'DELETE') {
    try {
      await prisma.pokemon.delete({
        where: { id }
      })
      res.status(200).json({ message: 'Pokemon deleted successfully' })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while deleting' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}