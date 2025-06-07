/**
 * Utility functions for working with location data
 */

import { LocationBase, regions, Route, Gym } from './locations';

/**
 * Gets a random location from a specific region or any region
 * @param regionName Optional region name to filter locations
 * @returns A random location name
 */
export function getRandomLocation(regionName?: string): string {
  const regionKeys = regionName
    ? [regionName.toLowerCase()]
    : Object.keys(regions);

  const randomRegionKey = regionKeys[Math.floor(Math.random() * regionKeys.length)];
  const region = regions[randomRegionKey];

  // Combine all location types
  const allLocations = [
    ...region.settlements,
    ...region.landmarks,
    ...region.routes,
  ];

  const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
  return randomLocation.name;
}

/**
 * Gets a random region name
 * @returns A random region name
 */
export function getRandomRegion(): string {
  const regionKeys = Object.keys(regions);
  const randomKey = regionKeys[Math.floor(Math.random() * regionKeys.length)];
  return regions[randomKey].name;
}

/**
 * Gets a random gym from a specific region or any region
 * @param regionName Optional region name to filter gyms
 * @returns A random gym (with fallback if none found in the specified region)
 */
export function getRandomGym(regionName?: string): Gym {
  // Default fallback gym in case none is found
  const fallbackGym: Gym = { name: 'Pewter Gym', type: 'gym', order: 1, badge: 'Boulder Badge', pokemonType: 'Rock', leader: 'Brock' };

  if (regionName) {
    // Get gyms from the specified region
    const regionKey = regionName.toLowerCase();
    const region = regions[regionKey];

    if (region && region.gyms && region.gyms.length > 0) {
      return region.gyms[Math.floor(Math.random() * region.gyms.length)];
    }

    // If no gyms found in the specified region, try to find gyms in any region
    const allGyms: Gym[] = [];
    Object.values(regions).forEach(region => {
      if (region.gyms && region.gyms.length > 0) {
        allGyms.push(...region.gyms);
      }
    });

    if (allGyms.length > 0) {
      return allGyms[Math.floor(Math.random() * allGyms.length)];
    }

    // If still no gyms found, return the fallback
    return fallbackGym;
  }

  // Get all gyms from all regions
  const allGyms: Gym[] = [];

  Object.values(regions).forEach(region => {
    if (region.gyms && region.gyms.length > 0) {
      allGyms.push(...region.gyms);
    }
  });

  if (allGyms.length > 0) {
    return allGyms[Math.floor(Math.random() * allGyms.length)];
  }

  // If no gyms found at all, return the fallback
  return fallbackGym;
}

/**
 * Gets a random route and two connected locations from a region
 * @param regionName The name of the region
 * @returns An object containing the route and two connected locations
 */
export function getRandomRouteWithConnections(regionName: string): {
  route: string;
  fromLocation: string;
  toLocation: string;
} {
  // Get the region key (lowercase)
  const regionKey = regionName.toLowerCase();

  // If the region doesn't exist, use a fallback
  if (!regions[regionKey]) {
    return {
      route: 'Route 1',
      fromLocation: 'Pallet Town',
      toLocation: 'Viridian City',
    };
  }

  // Get all routes in the region
  const routes = regions[regionKey].routes;

  // Filter routes that connect at least two locations
  const validRoutes = routes.filter(route => route.connects.length >= 2);

  // If no valid routes found, use a fallback
  if (validRoutes.length === 0) {
    return {
      route: 'Route 1',
      fromLocation: 'Pallet Town',
      toLocation: 'Viridian City',
    };
  }

  // Get a random route
  const randomRoute = validRoutes[Math.floor(Math.random() * validRoutes.length)];

  // Get two random connected locations from the route
  const connections = [...randomRoute.connects]; // Create a copy to avoid modifying the original
  const fromIndex = Math.floor(Math.random() * connections.length);
  const fromLocation = connections[fromIndex];

  // Remove the first location to avoid duplicates
  connections.splice(fromIndex, 1);

  // Get the second location
  const toLocation = connections[Math.floor(Math.random() * connections.length)];

  return {
    route: randomRoute.name,
    fromLocation,
    toLocation,
  };
}
