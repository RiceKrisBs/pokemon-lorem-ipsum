/**
 * Utility functions for working with Pokémon data
 */

import {
  Pokemon,
  pokemon,
} from './pokemon';

/**
 * Gets a random Pokémon
 * @returns A random Pokémon object
 */
export function getRandomPokemon(): Pokemon {
  const allPokemon = Object.values(pokemon);
  return allPokemon[Math.floor(Math.random() * allPokemon.length)];
}

/**
 * Generates a random move for a specific Pokémon
 * @param pokemon The Pokémon object
 * @returns A random move from the Pokémon's moveset
 */
export function getRandomMove(pokemon: Pokemon): string {
  return pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
}

/**
 * Gets a random Pokémon that can evolve and its evolution
 * @returns An object containing the base Pokémon and its evolution
 */
export function getRandomEvolutionPair(): { base: string; evolution: string } {
  // Filter Pokémon that have an evolution
  const evolvingPokemonKeys = Object.keys(pokemon).filter(key =>
    pokemon[key].evolvesInto !== undefined,
  );

  // If no evolving Pokémon found (shouldn't happen with our data), return a fallback
  if (evolvingPokemonKeys.length === 0) {
    return { base: 'Pikachu', evolution: 'Raichu' };
  }

  // Get a random Pokémon that can evolve
  const randomKey = evolvingPokemonKeys[Math.floor(Math.random() * evolvingPokemonKeys.length)];
  const basePokemon = pokemon[randomKey];

  // Find its evolution
  const evolutionName = basePokemon.evolvesInto;

  // Return the pair
  return {
    base: basePokemon.name,
    evolution: evolutionName || 'Unknown', // This fallback shouldn't be needed given our filter
  };
}
