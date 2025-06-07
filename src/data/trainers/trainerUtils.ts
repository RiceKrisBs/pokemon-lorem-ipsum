/**
 * Utility functions for working with trainer data
 */

import { trainerClasses } from './trainerClasses';

/**
 * Gets a random trainer class
 * @returns A random trainer class
 */
export function getRandomTrainerClass(): string {
  return trainerClasses[Math.floor(Math.random() * trainerClasses.length)];
}
