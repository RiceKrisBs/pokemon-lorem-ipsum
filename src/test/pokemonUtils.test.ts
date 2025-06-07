import * as assert from 'assert';
import {
  getRandomPokemon,
  getRandomMove,
  getRandomEvolutionPair,
} from '../data/pokemon/pokemonUtils';
import { pokemon } from '../data/pokemon/pokemon';

suite('Pokemon Utils Test Suite', () => {
  suite('getRandomPokemon', () => {
    test('returns a valid Pokémon object', () => {
      const result = getRandomPokemon();

      assert.strictEqual(typeof result, 'object', 'getRandomPokemon should return an object');
      assert.ok(result, 'getRandomPokemon should not return null or undefined');

      const sourcePokemon = Object.values(pokemon).find(p => p.name === result.name);
      assert.ok(sourcePokemon, `${result.name} should exist in the source data`);

      const expectedKeys = Object.keys(sourcePokemon!).sort();
      const actualKeys = Object.keys(result).sort();
      assert.deepStrictEqual(actualKeys, expectedKeys, 'Returned Pokémon should have all expected properties');
    });

    test('returns different results on multiple calls', () => {
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomPokemon();
        results.push(result.name);
      }

      const uniqueResults = new Set(results);

      const pokemonCount = Object.keys(pokemon).length;

      if (pokemonCount > 1) {
        assert.ok(uniqueResults.size > 1, 'getRandomPokemon should return different results on multiple calls');
      }
    });
  });

  suite('getRandomMove', () => {
    test('returns a valid move when given a Pokémon object', () => {
      const allPokemon = Object.values(pokemon);
      const samplePokemon = allPokemon.find(p => p.moves && p.moves.length > 0);

      if (!samplePokemon) {
        assert.fail('Test data should contain at least one Pokémon with moves');
      }

      const result = getRandomMove(samplePokemon);

      assert.strictEqual(typeof result, 'string', 'getRandomMove should return a string');
      assert.ok(result.length > 0, 'Returned move should not be empty');

      // Verify the move is in the Pokémon's moveset
      assert.ok(
        samplePokemon.moves.includes(result),
        `${result} should be in ${samplePokemon.name}'s moveset: ${samplePokemon.moves.join(', ')}`,
      );
    });
  });

  suite('getRandomEvolutionPair', () => {
    test('returns a valid evolution pair', () => {
      const result = getRandomEvolutionPair();

      // Check that the result has the expected structure
      assert.strictEqual(typeof result, 'object', 'getRandomEvolutionPair should return an object');
      assert.ok(result.base, 'Evolution pair should have a base property');
      assert.ok(result.evolution, 'Evolution pair should have an evolution property');
      assert.strictEqual(typeof result.base, 'string', 'base should be a string');
      assert.strictEqual(typeof result.evolution, 'string', 'evolution should be a string');

      // Find the base Pokémon in the source data
      const basePokemon = Object.values(pokemon).find(p => p.name === result.base);
      assert.ok(basePokemon, `Base Pokémon ${result.base} should exist in the source data`);

      // Verify that the evolution matches the base Pokémon's evolvesInto property
      assert.strictEqual(
				basePokemon!.evolvesInto,
				result.evolution,
				`Evolution ${result.evolution} should match ${result.base}'s evolvesInto property`,
      );
    });

    test('returns different results on multiple calls', () => {
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomEvolutionPair();
        results.push(`${result.base}-${result.evolution}`);
      }

      const uniqueResults = new Set(results);

      // Count how many Pokémon have evolutions
      const evolvingPokemonCount = Object.values(pokemon).filter(p => p.evolvesInto).length;

      // If there are multiple evolving Pokémon, we should get different results
      if (evolvingPokemonCount > 1) {
        assert.ok(uniqueResults.size > 1, 'getRandomEvolutionPair should return different results on multiple calls');
      }
    });
  });
});
