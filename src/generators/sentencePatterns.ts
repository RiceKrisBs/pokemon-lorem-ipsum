/**
 * Sentence patterns for Pokémon-themed lorem ipsum
 */

// Import utility functions directly from their respective data modules
import { getRandomPokemon, getRandomMove, getRandomEvolutionPair } from '../data/pokemon';
import { getRandomLocation, getRandomRegion, getRandomRouteWithConnections, getRandomGym } from '../data/locations';
import { getRandomBerry } from '../data/berries';
import { getRandomPokeBall } from '../data/items';
import { getRandomTrainerClass } from '../data/trainers';

/**
 * Defines a pattern for generating a sentence
 */
export interface SentencePattern {
  generate: () => string;
}

/**
 * Collection of sentence patterns for Pokémon-themed lorem ipsum
 */
export const sentencePatterns: SentencePattern[] = [
  // Pokémon learning moves
  {
    generate: () => {
      const pokemon = getRandomPokemon();
      const move = getRandomMove(pokemon);
      return `${pokemon.name} learned ${move}`;
    },
  },

  // Pokémon using moves
  {
    generate: () => {
      const pokemon = getRandomPokemon();
      const move = getRandomMove(pokemon);
      return `${pokemon.name} used ${move}`;
    },
  },

  // Trainer visiting location
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const region = getRandomRegion();
      const location = getRandomLocation(region);
      const verb = Math.random() > 0.5 ? 'visited' : 'explored';
      return `${trainerClass} ${verb} ${location} in ${region}`;
    },
  },

  // Pokémon found in location
  {
    generate: () => {
      const pokemon = getRandomPokemon();
      const location = getRandomLocation();
      return `${pokemon.name} was found in ${location}`;
    },
  },

  // Trainer using Poké Ball
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const pokeBall = getRandomPokeBall();
      const pokemon = getRandomPokemon();
      return `${trainerClass} used a ${pokeBall} to catch ${pokemon.name}`;
    },
  },

  // Pokémon evolution
  {
    generate: () => {
      const { base, evolution } = getRandomEvolutionPair();
      return `${base} evolved into ${evolution}`;
    },
  },

  // Trainer with berry
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const berry = getRandomBerry();
      const pokemon = getRandomPokemon();
      return `${trainerClass} gave a ${berry} to ${pokemon.name}`;
    },
  },

  // Trainer traveling between locations via a route
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const region = getRandomRegion();
      // Get a random route with connected locations
      const { route, fromLocation, toLocation } = getRandomRouteWithConnections(region);

      // Randomly choose between different sentence structures
      const randomFormat = Math.random();
      if (randomFormat < 0.33) {
        return `${trainerClass} traveled from ${fromLocation} to ${toLocation} via ${route}`;
      } else if (randomFormat < 0.66) {
        return `${trainerClass} took ${route} from ${fromLocation} to ${toLocation}`;
      } else {
        return `${trainerClass} journeyed along ${route} between ${fromLocation} and ${toLocation}`;
      }
    },
  },

  // Pokémon in region
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const pokemon = getRandomPokemon();
      const region = getRandomRegion();
      return `${trainerClass} spotted ${pokemon.name} in ${region}`;
    },
  },

  // Trainer with favorite Pokémon
  {
    generate: () => {
      const trainerClass = getRandomTrainerClass();
      const pokemon = getRandomPokemon();
      return `${trainerClass}'s favorite Pokémon is ${pokemon.name}`;
    },
  },

  // Trainer earned badge at a gym
  {
    generate: () => {
      const gym = getRandomGym();
      return `You can earn the ${gym.badge} at ${gym.name}`;
    },
  },

  // Gyms specialize in certtain Pokémon types
  {
    generate: () => {
      const gym = getRandomGym();
      return `The leader at ${gym.name} specializes in ${gym.pokemonType} Pokémon`;
    },
  },

  // Gym can be found in a region
  {
    generate: () => {
      const region = getRandomRegion();

      // Special case for Alola region which has no gyms
      if (region === 'Alola') {
        return `The Alola region has no gyms`;
      }

      const gym = getRandomGym(region);
      return `You can find the ${gym.name} in ${region}`;
    },
  },
];

