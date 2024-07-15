import prisma from "../utils/prisma";

export default async function handler(req, res) {
  const { data } = req.body;
  const pokemons = await prisma.pokemon.findMany()
  const id = pokemons.length + 1
  data.ident = id
  console.log('pokemons', pokemons.length)
  if (req.method === 'POST') {
    try {
      const typePromises = data.type.map(async (t) => {
        const type = await prisma.type.findUnique({ where: { name: t } });
        if (!type) {
          throw new Error(`Type '${t}' does not exist`);
        }
      });
      if (!data.ident || !data.name || !data.image || !data.health || !data.attack || !data.defense || !data.speed || !data.height || !data.weight || !data.type) throw new Error('Missing data')
      await Promise.all(typePromises);
      const poke = await prisma.pokemon.create({ data });
      res.status(200).json({ message: 'Pokemon created successfully', data: poke });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Error creating pokemon' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
