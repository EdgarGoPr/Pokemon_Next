import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method === 'POST') {
    fetch('https://pokeapi.co/api/v2/type/')
      .then((apiResponse) => apiResponse.json())
      .then((apiData) => {
        const apiTypes = apiData.results.map((type) => ({
          name: type.name,
        }));

        Promise.all(
          apiTypes.map((type) => {
            return prisma.type.upsert({
              where: { name: type.name },
              update: { ...type },
              create: { ...type },
            });
          })
        )
          .then(() => {
            res.status(200).json({ message: 'Database filled successfully' });
          })
          .catch((error) => {
            console.log('Error:', error);
            res.status(500).json({ message: 'An error occurred while fetching data' });
          });
      })
      .catch((error) => {
        console.log('Error:', error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
      });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
