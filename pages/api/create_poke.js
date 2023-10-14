import prisma from "./utils/prisma";

export default async function handler(req, res) {
  const { data } = req.body;
  if (req.method === 'POST') {
    try {
      const typePromises = data.type.map(async (t) => {
        const type = await prisma.type.findUnique({ where: { name: t } });
        if (!type) {
          throw new Error(`Type '${t}' does not exist`);
        }
      });
      await Promise.all(typePromises);
      const poke = await prisma.pokemon.create({ data });
      res.status(200).json({ message: 'Pokemon created successfully', data: poke });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
