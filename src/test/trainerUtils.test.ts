import * as assert from 'assert';
import { getRandomTrainerClass } from '../data/trainers/trainerUtils';
import { trainerClasses } from '../data/trainers/trainerClasses';

suite('Trainer Utils Test Suite', () => {
  suite('getRandomTrainerClass', () => {
    test('returns a valid trainer class', () => {
      const trainerClass = getRandomTrainerClass();

      assert.strictEqual(typeof trainerClass, 'string');
      assert.ok(trainerClasses.includes(trainerClass), `${trainerClass} should be in the trainerClasses array`);
    });

    test('returns different results on multiple calls', () => {
      const results = new Set();

      for (let i = 0; i < 10; i++) {
        results.add(getRandomTrainerClass());

        if (results.size > 1) {
          break;
        }
      }

      assert.ok(results.size > 1, 'getRandomTrainerClass should return different values across multiple calls');
    });
  });
});
