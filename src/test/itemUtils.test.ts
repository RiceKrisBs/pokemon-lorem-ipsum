import * as assert from 'assert';
import { getRandomPokeBall } from '../data/items/itemUtils';
import { pokeBalls } from '../data/items/pokeBalls';

suite('Item Utils Test Suite', () => {
  suite('getRandomPokeBall', () => {
    test('returns a valid Poke Ball', () => {
      const pokeBall = getRandomPokeBall();

      assert.strictEqual(typeof pokeBall, 'string');
      assert.ok(pokeBalls.includes(pokeBall), `${pokeBall} should be in the pokeBalls array`);
    });

    test('returns different results on multiple calls', () => {
      const results = new Set();

      for (let i = 0; i < 10; i++) {
        results.add(getRandomPokeBall());

        if (results.size > 1) {
          break;
        }
      }

      assert.ok(results.size > 1, 'getRandomPokeBall should return different values across multiple calls');
    });
  });
});
