import prisma from "../utils/prisma";

const paginatePokemons = (pokemons, page, pageS) => {
  const startIndex = (page - 1) * pageS;
  const endIndex = page * pageS;
  return pokemons.slice(startIndex, endIndex);
};

export default async function get_all_poke(req, res) {
  const { name, sort, type, page, pageS } = req.query
  try {
    let data
    if (name) {
      data = await prisma.pokemon.findMany({
        where: {
          name: {
            contains: name
          }
        }
      })
    } else {
      data = await prisma.Pokemon.findMany({
        where: {
          isActive: true,
        }
      });
    }
    if (type) {
      data = data.filter((p) => p.type.includes(type))
    }
    switch (sort) {
      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "max":
        data.sort((a, b) => b.attack - a.attack);
        break;
      case "min":
        data.sort((a, b) => a.attack - b.attack);
        break;
      case "idnum":
        data.sort((a, b) => a.ident - b.ident);
        break;
      default:
        break;
    }
    const num = data.length;
    data = paginatePokemons(data, page, pageS)
    return res.status(200).json({ message: 'Fetch successful', total: num, data: data });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ message: 'An error occurred while fetching data' });
  }
}
