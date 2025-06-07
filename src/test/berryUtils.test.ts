import * as assert from 'assert';
import { getRandomBerry } from '../data/berries/berryUtils';
import { berries } from '../data/berries/berries';

suite('Berry Utils Test Suite', () => {
  suite('getRandomBerry', () => {
    test('returns a valid berry', () => {
      const berry = getRandomBerry();

      assert.strictEqual(typeof berry, 'string');
      assert.ok(berries.includes(berry), `${berry} should be in the berries array`);
    });

    test('returns different results on multiple calls', () => {
      const results = new Set();

      for (let i = 0; i < 10; i++) {
        results.add(getRandomBerry());

        if (results.size > 1) {
          break;
        }
      }

      assert.ok(results.size > 1, 'getRandomBerry should return different values across multiple calls');
    });
  });
});
