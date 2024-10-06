// Function to calculate distance between two points on the sphere

import { PLANET_POINTS } from "./global";

const distanceFunction = (a, b) => {
    // Handle array case
    const getCoords = (point) => Array.isArray(point)
        ? { x: point[0], y: point[1], z: point[2] } // Convert array [x, y, z] to object {x, y, z}
        : point; // If it's already an object, use it as is

    const aCoords = getCoords(a);
    const bCoords = getCoords(b);

    return Math.sqrt(
        Math.pow(aCoords.x - bCoords.x, 2) +
        Math.pow(aCoords.y - bCoords.y, 2) +
        Math.pow(aCoords.z - bCoords.z, 2)
    );
};

// KD-Tree class implementation
class KDTree {
    constructor(points, distance) {
        this.points = points;
        this.distance = distance;
    }

    nearest(point, k) {
        // console.log(this.points)
        let distances = []
        this.points.forEach(p => {
            const obj_n = {
                point: p,
                distance: this.distance(point, p)
            }
            // console.log(obj_n)
            distances.push(obj_n)
        });
        // console.log("Point:")
        // console.log(point)
        // console.log("p:")
        // console.log(p)
        // console.log("Dist:")
        // console.log(distances)
        distances.sort((a, b) => a.distance - b.distance);
        // console.log("Sorted:")
        // console.log(distances)
        return distances.slice(0, k).map(d => d.point);
    }
}

export function randomTectonicPlates(points, numPlates, threshold_scale= 1) {
    let threshold = PLANET_POINTS/1000 * threshold_scale
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

    // Detect boundary points by finding neighbors on different plates
    const boundaryPoints = [];
    const pointTree = new KDTree(points, distanceFunction);

    points.forEach((point, i) => {
        const neighbors = pointTree.nearest(point, threshold);

        for (let neighbor of neighbors) {
            const neighborIndex = points.indexOf(neighbor);
            if (labels[i] !== labels[neighborIndex]) {
                boundaryPoints.push(point);
                break;
            }
        }
    });

    return boundaryPoints;
}
