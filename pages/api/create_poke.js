import prisma from "./utils/prisma";

export default async function handler(req, res) {
  const { data } = req.body
  if (req.method === 'POST') {
    try {
      const poke = await prisma.pokemon.create({ data: data })
      res.status(200).json({ message: 'Pokemon created successfully', data: poke })
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'An error occurred while creating pokemon' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
