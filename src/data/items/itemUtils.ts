/**
 * Utility functions for working with item data
 */

import { pokeBalls } from './pokeBalls';

/**
 * Gets a random Poké Ball name
 * @returns A random Poké Ball name
 */
export function getRandomPokeBall(): string {
  return pokeBalls[Math.floor(Math.random() * pokeBalls.length)];
}
