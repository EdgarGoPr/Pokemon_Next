import prisma from "../utils/prisma";
import formatCard from "../utils/format_poke";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=51')
      .then(async (apiResponse) => {
        const apiData = await apiResponse.json();
        const apiPokemons = await Promise.all(
          apiData.results.map(async (p) => {
            const response = await fetch(p.url);
            const data = await response.json()
            return formatCard(data)
          })
        )
        const dbPokemons = await Promise.all(
          apiPokemons.map(async (pokemon) => {
            return await prisma.Pokemon.upsert({
              where: { name: pokemon.name },
              update: { ...pokemon },
              create: { ...pokemon },
            });
          })
        );

        res.status(200).json({ message: 'Database filled successfully' })
      })
      .catch((error) => {
        console.log('Error:', error);
        res.status(500).json({ message: 'An error occured while fetching data' });
      });
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

