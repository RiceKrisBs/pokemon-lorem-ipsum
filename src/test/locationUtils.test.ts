import * as assert from 'assert';
import {
  getRandomLocation,
  getRandomRegion,
  getRandomGym,
  getRandomRouteWithConnections,
} from '../data/locations/locationUtils';
import { regions } from '../data/locations/locations';

suite('Location Utils Test Suite', () => {
  suite('getRandomLocation', () => {
    test('returns a valid location name', () => {
      const result = getRandomLocation();

      assert.strictEqual(typeof result, 'string', 'getRandomLocation should return a string');
      assert.ok(result.length > 0, 'Returned location should not be empty');

      // Check that the location exists in at least one region
      const allLocations = Object.values(regions).flatMap(region => [
        ...region.settlements.map(s => s.name),
        ...region.landmarks.map(l => l.name),
        ...region.routes.map(r => r.name),
      ]);

      assert.ok(
        allLocations.includes(result),
        `${result} should exist in the location data`,
      );
    });

    test('returns a location from the specified region', () => {
      // Test with a specific region (Kanto)
      const regionName = 'Kanto';
      const result = getRandomLocation(regionName);

      assert.strictEqual(typeof result, 'string', 'getRandomLocation should return a string');
      assert.ok(result.length > 0, 'Returned location should not be empty');

      // Get all locations from the specified region
      const regionLocations = [
        ...regions[regionName.toLowerCase()].settlements.map(s => s.name),
        ...regions[regionName.toLowerCase()].landmarks.map(l => l.name),
        ...regions[regionName.toLowerCase()].routes.map(r => r.name),
      ];

      assert.ok(
        regionLocations.includes(result),
        `${result} should exist in the ${regionName} region`,
      );
    });

    test('returns different results on multiple calls', () => {
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomLocation();
        results.push(result);
      }

      const uniqueResults = new Set(results);
      assert.ok(uniqueResults.size > 1, 'getRandomLocation should return different results on multiple calls');
    });
  });

  suite('getRandomRegion', () => {
    test('returns a valid region name', () => {
      const result = getRandomRegion();

      assert.strictEqual(typeof result, 'string', 'getRandomRegion should return a string');
      assert.ok(result.length > 0, 'Returned region should not be empty');

      // Get all region names
      const regionNames = Object.values(regions).map(region => region.name);

      assert.ok(
        regionNames.includes(result),
        `${result} should be a valid region name`,
      );
    });

    test('returns different results on multiple calls', () => {
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomRegion();
        results.push(result);
      }

      const uniqueResults = new Set(results);
      assert.ok(uniqueResults.size > 1, 'getRandomRegion should return different results on multiple calls');
    });
  });

  suite('getRandomGym', () => {
    test('returns a valid gym object', () => {
      const result = getRandomGym();

      assert.strictEqual(typeof result, 'object', 'getRandomGym should return an object');
      assert.ok(result.name, 'Gym should have a name property');
      assert.ok(result.type, 'Gym should have a type property');
      assert.strictEqual(result.type, 'gym', 'Gym type should be "gym"');
      assert.ok(result.badge, 'Gym should have a badge property');
      assert.ok(result.pokemonType, 'Gym should have a pokemonType property');
      assert.ok(result.leader, 'Gym should have a leader property');
      assert.ok(typeof result.order === 'number', 'Gym should have a numeric order property');

      const allGyms = Object.values(regions)
        .filter(region => region.gyms !== undefined)
        .flatMap(region => region.gyms || []);

      const matchingGym = allGyms.find(gym => gym.name === result.name);
      assert.ok(matchingGym, `${result.name} should exist in the gym data`);
    });

    test('returns a gym from the specified region', () => {
      const regionName = 'Kanto';
      const result = getRandomGym(regionName);

      assert.strictEqual(typeof result, 'object', 'getRandomGym should return an object');
      assert.ok(result.name, 'Gym should have a name property');

      const regionGyms = regions[regionName.toLowerCase()].gyms || [];
      const regionGymNames = regionGyms.map(gym => gym.name);

      assert.ok(
        regionGymNames.includes(result.name),
        `${result.name} should be a gym in the ${regionName} region`,
      );
    });

    test('returns different results on multiple calls', () => {
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomGym();
        results.push(result.name);
      }

      const uniqueResults = new Set(results);
      assert.ok(uniqueResults.size > 1, 'getRandomGym should return different results on multiple calls');
    });
  });

  suite('getRandomRouteWithConnections', () => {
    test('returns a valid route and connected locations', () => {
      const regionName = 'Kanto';
      const result = getRandomRouteWithConnections(regionName);

      assert.strictEqual(typeof result, 'object', 'getRandomRouteWithConnections should return an object');
      assert.strictEqual(typeof result.route, 'string', 'Result should have a route string property');
      assert.strictEqual(typeof result.fromLocation, 'string', 'Result should have a fromLocation string property');
      assert.strictEqual(typeof result.toLocation, 'string', 'Result should have a toLocation string property');
      assert.ok(result.route.length > 0, 'Route name should not be empty');
      assert.ok(result.fromLocation.length > 0, 'From location should not be empty');
      assert.ok(result.toLocation.length > 0, 'To location should not be empty');

      const regionRoutes = regions[regionName.toLowerCase()].routes;
      const routeNames = regionRoutes.map(route => route.name);

      assert.ok(
        routeNames.includes(result.route),
        `${result.route} should be a route in the ${regionName} region`,
      );

      // Find all route objects with the same name (handles duplicate route names with different connections)
      const routeObjects = regionRoutes.filter(route => route.name === result.route);

      if (routeObjects.length > 0) {
        // Check if fromLocation is connected by any of the route objects with this name
        const fromLocationConnected = routeObjects.some(route =>
          route.connects.includes(result.fromLocation),
        );

        assert.ok(
          fromLocationConnected,
          `${result.fromLocation} should be connected by ${result.route}`,
        );

        // Check if toLocation is connected by any of the route objects with this name
        const toLocationConnected = routeObjects.some(route =>
          route.connects.includes(result.toLocation),
        );

        assert.ok(
          toLocationConnected,
          `${result.toLocation} should be connected by ${result.route}`,
        );

        assert.notStrictEqual(
          result.fromLocation,
          result.toLocation,
          'From and To locations should be different',
        );
      }
    });

    test('handles invalid region names', () => {
      const result = getRandomRouteWithConnections('NonExistentRegion');

      assert.strictEqual(result.route, 'Route 1', 'Should use fallback route for invalid region');
      assert.strictEqual(result.fromLocation, 'Pallet Town', 'Should use fallback from location for invalid region');
      assert.strictEqual(result.toLocation, 'Viridian City', 'Should use fallback to location for invalid region');
    });

    test('returns different results on multiple calls', () => {
      const regionName = 'Kanto';
      const results = [];
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomRouteWithConnections(regionName);
        results.push(`${result.route}|${result.fromLocation}|${result.toLocation}`);
      }

      const uniqueResults = new Set(results);

      assert.ok(
        uniqueResults.size > 1,
        'getRandomRouteWithConnections should return different results on multiple calls',
      );
    });
  });
});
