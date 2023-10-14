import prisma from "./utils/prisma";

export default async function handler(req, res) {
  const { id } = req.query
  const { data } = req.body
  if (req.method === 'PUT') {
    try {
      const updatedPokemon = await prisma.pokemon.update({
        where: { id },
        data: {
          name: data.name,
          image: data.image,
          health: data.health,
          attack: data.attack,
          defense: data.defense,
          speed: data.speed,
          height: data.height,
          weight: data.weight,
          type: data.type,
        },
      });
      res.status(200).json({ message: 'Activation successful', data: updatedPokemon });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while activating data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}