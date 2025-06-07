import * as assert from 'assert';
import { getRandomInt, addLoremIpsumPrefix, generateRandomSentence, generateParagraph, generateText } from '../generators/loremIpsumGenerator';

suite('Lorem Ipsum Generator Test Suite', () => {
  suite('getRandomInt', () => {
    test('returns a number within the specified range', () => {
      const min = 3;
      const max = 5;
      const results: number[] = [];

      // Generate 100 random numbers and collect them
      for (let i = 0; i < 100; i++) {
        results.push(getRandomInt(min, max));
      }

      // Find the minimum and maximum values in our results
      const minResult = Math.min(...results);
      const maxResult = Math.max(...results);

      // Assert that all results are within the specified range
      assert.ok(
        minResult >= min,
        `Minimum result ${minResult} should be >= ${min}`,
      );

      assert.ok(
        maxResult <= max,
        `Maximum result ${maxResult} should be <= ${max}`,
      );

      // Verify all results are integers
      const allIntegers = results.every(result => result === Math.floor(result));
      assert.ok(allIntegers, 'All results should be integers');
    });

    test('handles min equal to max', () => {
      const min = 5;
      const max = 5;

      const result = getRandomInt(min, max);

      assert.strictEqual(
        result,
        5,
        'When min equals max, the function should return that value',
      );
    });

    test('returns different values on multiple calls', () => {
      const min = 1;
      const max = 1000; // Large range to ensure we get different values
      const results = new Set<number>();

      // Run multiple iterations
      for (let i = 0; i < 10; i++) {
        results.add(getRandomInt(min, max));
      }

      // With a large enough range, we should get multiple unique values
      assert.strictEqual(results.size > 1, true, 'getRandomInt should return different values across multiple calls');
    });
  });

  suite('addLoremIpsumPrefix', () => {
    test('adds "Lorem ipsum" prefix when includePrefix is true', () => {
      const sentence = 'Pikachu used Thunderbolt';
      const result = addLoremIpsumPrefix(sentence, true);

      assert.strictEqual(result, 'Lorem ipsum Pikachu used Thunderbolt', 'Should add "Lorem ipsum" prefix when includePrefix is true');
    });

    test('does not add prefix when includePrefix is false', () => {
      const sentence = 'Pikachu used Thunderbolt';
      const result = addLoremIpsumPrefix(sentence, false);

      assert.strictEqual(result, sentence, 'Should return the original sentence when includePrefix is false');
    });
  });

  suite('generateRandomSentence', () => {
    test('returns a valid string', () => {
      const result = generateRandomSentence();

      assert.strictEqual(typeof result, 'string', 'generateRandomSentence should return a string');
      assert.strictEqual(result.length > 0, true, 'Generated sentence should not be empty');
    });

    test('adds period at the end when addPeriod is true', () => {
      const result = generateRandomSentence(true, true);

      assert.strictEqual(result.endsWith('.'), true, 'Sentence should end with a period when addPeriod is true');
    });

    test('includes "Lorem ipsum" when includeLoremIpsum is true', () => {
      const result = generateRandomSentence(true, true);

      assert.strictEqual(result.startsWith('Lorem ipsum'), true, 'Sentence should start with "Lorem ipsum" when includeLoremIpsum is true');
    });

    test('does not include "Lorem ipsum" when includeLoremIpsum is false', () => {
      const result = generateRandomSentence(false, true);

      assert.strictEqual(result.startsWith('Lorem ipsum'), false, 'Sentence should not start with "Lorem ipsum" when includeLoremIpsum is false');
    });

    test('returns different results on multiple calls', () => {
      const results = new Set<string>();

      // Generate multiple sentences
      for (let i = 0; i < 10; i++) {
        results.add(generateRandomSentence());
      }

      // With enough patterns, we should get different sentences
      assert.strictEqual(results.size > 1, true, 'generateRandomSentence should return different sentences across multiple calls');
    });
  });

  suite('generateParagraph', () => {
    test('returns a non-empty string', () => {
      const paragraph = generateParagraph(3);

      assert.strictEqual(typeof paragraph, 'string');
      assert.ok(paragraph.length > 0, 'Paragraph should not be empty');
    });

    test('accepts custom sentence count', () => {
      const smallParagraph = generateParagraph(2);
      const largeParagraph = generateParagraph(10);

      assert.ok(largeParagraph.length > smallParagraph.length,
        'Paragraph with more sentences should be longer');
    });

    test('includes Lorem ipsum prefix', () => {
      const paragraph = generateParagraph(3);

      assert.ok(
        paragraph.startsWith('Lorem ipsum'),
        'Paragraph should start with Lorem ipsum',
      );
    });

    test('returns different results on multiple calls', () => {
      const results = new Set();

      for (let i = 0; i < 3; i++) {
        results.add(generateParagraph(2));
      }

      assert.ok(results.size > 1, 'generateParagraph should return different results');
    });
  });

  suite('generateText', () => {
    test('returns a non-empty string', () => {
      const text = generateText(2);

      assert.strictEqual(typeof text, 'string');
      assert.ok(text.length > 0, 'Text should not be empty');
    });

    test('contains the correct number of paragraphs', () => {
      const paragraphCount = 4;
      const text = generateText(paragraphCount);

      // Count paragraph breaks to determine number of paragraphs
      const paragraphs = text.split('\n\n');
      assert.strictEqual(paragraphs.length, paragraphCount, 'Text should have the specified number of paragraphs');
    });

    test('defaults to 3 paragraphs when count not specified', () => {
      const text = generateText();

      // Count paragraph breaks to determine number of paragraphs
      const paragraphs = text.split('\n\n');
      assert.strictEqual(paragraphs.length, 3, 'Text should have 3 paragraphs by default');
    });

    test('each paragraph starts with Lorem ipsum', () => {
      const text = generateText(2);
      const paragraphs = text.split('\n\n');

      paragraphs.forEach(paragraph => {
        assert.ok(
          paragraph.startsWith('Lorem ipsum'),
          'Each paragraph should start with Lorem ipsum',
        );
      });
    });

    test('returns different results on multiple calls', () => {
      const results = new Set();

      for (let i = 0; i < 3; i++) {
        results.add(generateText(1));
      }

      assert.ok(results.size > 1, 'generateText should return different results');
    });
  });
});
