import prisma from "./utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    try {
      const updatedPokemon = await prisma.pokemon.update({
        where: { id },
        data: { isActive: false },
      });
      res.status(200).json({ message: 'Deletion successful', data: updatedPokemon });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while deleting data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
