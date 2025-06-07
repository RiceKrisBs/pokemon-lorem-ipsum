/**
 * Main generator for Pokémon-themed lorem ipsum text
 */

import { sentencePatterns } from './sentencePatterns';

/**
 * Generates a random sentence using the defined patterns
 * @param includeLoremIpsum Whether to include "Lorem ipsum" at the beginning of the sentence (default: true)
 * @param addPeriod Whether to add a period at the end of the sentence if it doesn't have one (default: true)
 * @returns A random Pokémon-themed lorem ipsum sentence
 */
export function generateRandomSentence(includeLoremIpsum: boolean = true, addPeriod: boolean = true): string {
  const randomPattern = sentencePatterns[Math.floor(Math.random() * sentencePatterns.length)];
  const sentence = randomPattern.generate();
  const prefixedSentence = addLoremIpsumPrefix(sentence, includeLoremIpsum);

  // Add a period only if requested and if the sentence doesn't already end with one
  if (addPeriod && !prefixedSentence.endsWith('.')) {
    return prefixedSentence + '.';
  }
  return prefixedSentence;
}

/**
 * Generates a paragraph of Pokémon-themed lorem ipsum text
 * @param sentenceCount Optional number of sentences to generate. If not provided, a random number between 4 and 9 will be used.
 * @returns A paragraph of Pokémon-themed lorem ipsum text
 */
export function generateParagraph(sentenceCount?: number): string {
  // If sentenceCount is not provided, generate a random number between 4 and 9
  const count = sentenceCount !== undefined ? sentenceCount : getRandomInt(4, 9);

  const sentences: string[] = [];

  for (let i = 0; i < count; i++) {
    // Only include "Lorem ipsum" in the first sentence of the paragraph
    // Don't add periods to individual sentences as we'll handle punctuation when joining
    const sentence = generateRandomSentence(i === 0, false);
    sentences.push(sentence);
  }

  return sentences.join('. ') + '.';
}

/**
 * Generates multiple paragraphs of Pokémon-themed lorem ipsum text
 * @param paragraphCount Number of paragraphs to generate (default: 3)
 * @returns Multiple paragraphs of Pokémon-themed lorem ipsum text
 */
export function generateText(paragraphCount: number = 3): string {
  const paragraphs: string[] = [];

  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateParagraph());
  }

  return paragraphs.join('\n\n');
}

/**
 * Adds the "Lorem ipsum" prefix to a sentence if needed
 * @param sentence The sentence to potentially prefix
 * @param includePrefix Whether to include the "Lorem ipsum" prefix
 * @returns The sentence with or without the prefix
 */
export function addLoremIpsumPrefix(sentence: string, includePrefix: boolean): string {
  if (includePrefix) {
    return `Lorem ipsum ${sentence}`;
  }
  return sentence;
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer between min and max
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
