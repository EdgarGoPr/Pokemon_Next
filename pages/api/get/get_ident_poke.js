import prisma from "../utils/prisma";

const handler = async (req, res) => {
  const { ident } = req.query;

  try {
    const id = parseInt(ident)
    const pokemon = await prisma.pokemon.findUnique({
      where: { ident: id },
    });

    if (pokemon) {
      return res.status(200).json({ message: "The pokemon exists" });
    } else {
      return res.status(200).json({ message: "No pokemons found" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "An error occurred while fetching data" });
  }
};

export default handler;