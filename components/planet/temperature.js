// Function to calculate distance between two points on the sphere
const distanceFunction = (a, b) => Math.sqrt(
  Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
);

// KD-Tree class implementation
class KDTree {
  constructor(points, distance) {
    this.points = points;
    this.distance = distance;
  }

  nearest(point, k) {
    const distances = this.points.map(p => ({
      point: p,
      distance: this.distance(point, p)
    }));
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, k).map(d => d.point);
  }
}

// Fibonacci sphere function for generating points on a sphere
function fibonacciSphere(samples = 3000) {
  const points = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle in radians

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);   // radius at y
    const theta = phi * i;                 // golden angle increment

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push({ x, y, z });
  }

  return points;
}

// Generate points on the sphere
const points = fibonacciSphere(1500); // Adjust the number of samples as needed

// Spherical Voronoi and Tectonic Plate generation
function randomTectonicPlates(points, numPlates, threshold = 0.05) {
  const seedPoints = [];
  for (let i = 0; i < numPlates; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const norm = Math.sqrt(x * x + y * y + z * z);
    seedPoints.push({ x: x / norm, y: y / norm, z: z / norm });
  }

  const tree = new KDTree(seedPoints, distanceFunction);
  const labels = points.map(p => tree.nearest(p, 1)[0]);
  return labels; // Return labels to be used later
}

// Create KDTree for nearest neighbors search
const tree = new KDTree(points, distanceFunction);

// Find neighbors for each point (using a larger number for better averaging)
const neighborsIdx = points.map(point => tree.nearest(point, 10)); // Increased neighbor count

// Function to update the temperature based on heat diffusion from multiple volcanoes
function simulateHeatDiffusion(temperature, neighborsIdx, thermalDiffusivity, timeStep, numSteps, coriolisFactor) {
  for (let step = 0; step < numSteps; step++) {
    const newTemperature = temperature.slice();

    for (let i = 0; i < temperature.length; i++) {
      if (temperature[i] === 1000) continue; // Skip heat sources (volcano zones)

      // Group neighbors by distance
      const distanceGroups = {};

      neighborsIdx[i].forEach(neighbor => {
        const neighborIndex = points.indexOf(neighbor);
        const dist = distanceFunction(points[i], neighbor);

        if (!distanceGroups[dist]) {
          distanceGroups[dist] = [];
        }
        distanceGroups[dist].push(temperature[neighborIndex]);
      });

      // Calculate average temperature for each distance group
      const averageTemperatures = Object.keys(distanceGroups).map(dist => {
        const temps = distanceGroups[dist];
        const average = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return { distance: parseFloat(dist), average };
      });

      // Calculate new temperature based on weighted average from groups
      let totalWeightedTemp = 0;
      let totalWeights = 0;

      averageTemperatures.forEach(group => {
        const weight = 1 / (1 + group.distance); // Weight inversely proportional to distance
        totalWeightedTemp += group.average * weight;
        totalWeights += weight;
      });

      // Final temperature update
      newTemperature[i] += thermalDiffusivity * (totalWeightedTemp / totalWeights - temperature[i]) * timeStep;
    }

    // Apply Coriolis effect after temperature update (for now just a placeholder)
    temperature = applyCoriolisEffect(newTemperature, points, coriolisFactor);
  }

  return temperature;
}

// Placeholder for Coriolis effect function
function applyCoriolisEffect(temperature, points, coriolisFactor) {
  // Add logic here if needed, for now just return the temperature
  return temperature;
}

// Generate volcanoes (placeholder function, replace with actual logic)
function generateVolcanoes(boundaryPoints, maxVolcanoes = 100, minVolcanoes = 30, volcanicActivity = 25) {
  const volcanoes = [];
  const numVolcanoes = Math.floor(Math.random() * (maxVolcanoes - minVolcanoes + 1)) + minVolcanoes;
  const numRandVolcanoes = Math.floor(Math.random() * (5) + 1);
  for (let i = 0; i < numVolcanoes; i++) {
    const randomBoundary = boundaryPoints[Math.floor(Math.random() * boundaryPoints.length)];
    const displacementFactor = (Math.random() * 0.05); // Small displacement from the boundary
    volcanoes.push({
      x: randomBoundary.x + displacementFactor * (Math.random() - 0.5),
      y: randomBoundary.y + displacementFactor * (Math.random() - 0.5),
      z: randomBoundary.z + displacementFactor * (Math.random() - 0.5),
      radius: volcanicActivity / 500 + Math.random() * 0.05
    });
  }
  for (let i = 0; i < numRandVolcanoes; i++) {
    volcanoes.push({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      radius: 0.1 + Math.random() * 0.05
    });
  }

  return volcanoes;
}

// Generate volcanoes near tectonic boundaries

// Set initial temperature array (high temperatures near each volcano)

// Simulate heat diffusion over time
const thermalDiffusivity = 0.25;
const timeStep = 2;
const totalTime = 6.0;
const numSteps = Math.floor(totalTime / timeStep);

const getColorFromTemperature = (temp) => {
  const maxTemp = 1000;
  const minTemp = 0;
  const normalizedTemp = (temp - minTemp) / (maxTemp - minTemp);

  return normalizedTemp;
};


// Function to convert XYZ coordinates to UV
function xyzToUv(x, y, z) {
  const radius = Math.sqrt(x * x + y * y + z * z);

  // Calculate polar and azimuthal angles
  const theta = Math.acos(z / radius);
  const phi = Math.atan2(y, x);

  // Map angles to UV coordinates
  const u = 0.5 + (phi / (2 * Math.PI));
  const v = 1 - (theta / Math.PI);

  return { u: u, v: v };
}

// Generate points with temperature and UV coordinates
export function getTemperaturePoints(volcanicActivity) {
  const output = [];
  var volcanoes = generateVolcanoes(points, volcanicActivity);
  var temperature = Array(points.length).fill(0);
  volcanoes.forEach(volcano => {
    points.forEach((point, i) => {
      const distToVolcano = Math.sqrt(
        Math.pow(point.x - volcano.x, 2) +
        Math.pow(point.y - volcano.y, 2) +
        Math.pow(point.z - volcano.z, 2)
      );

      // Points within a certain radius from the volcano have a high temperature
      if (distToVolcano < volcano.radius) {
        temperature[i] = 1000;
      }
    });
  });
  const finalTemperature = simulateHeatDiffusion(temperature, neighborsIdx, thermalDiffusivity, timeStep, numSteps, 0.1);
  points.forEach((point, i) => {
    const uvCoordinates = xyzToUv(point.x, point.y, point.z);
    const wholePoint = { u: uvCoordinates.u, v: uvCoordinates.v, r: getColorFromTemperature(finalTemperature[i]), g: getColorFromTemperature(finalTemperature[i]), b: getColorFromTemperature(finalTemperature[i]) }; output.push(wholePoint);
  });
  return output;
}
