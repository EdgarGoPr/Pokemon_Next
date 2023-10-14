
export default function formatCard(pokemon) {
  if (!pokemon) {
    return null;
  }

  const {
    id,
    name,
    sprites,
    stats,
    height,
    weight,
    types,
    attack,
    defense,
    life,
    speed,
  } = pokemon;

  const formattedPokemon = {
    ident: id,
    name,
    image: sprites?.['versions']['generation-v']['black-white']['animated']['front_default'] || sprites?.front_default,
    health: stats?.[0]?.base_stat || 0, 
    attack: stats?.[1]?.base_stat || 0, 
    defense: stats?.[2]?.base_stat || 0, 
    speed: stats?.[5]?.base_stat || 0,
    height,
    weight,
    type: types?.map((type) => type?.type?.name || null) || [],
  };

  return formattedPokemon;
}