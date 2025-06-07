/**
 * Utility functions for working with berry data
 */

import { berries } from './berries';

/**
 * Gets a random berry name
 * @returns A random berry name
 */
export function getRandomBerry(): string {
  return berries[Math.floor(Math.random() * berries.length)];
}
