/**
 * Export only location data and utility functions that are actually used by the generators
 */

// Only export the utility functions needed by the generators
export {
  getRandomGym,
  getRandomLocation,
  getRandomRegion,
  getRandomRouteWithConnections,
} from './locationUtils';
