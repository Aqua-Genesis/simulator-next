import { xyzListToUvHeight } from "./planet_renderer";
import { PointRender } from "./point_render";
import { Renderer } from "./renderer";

const { STEEPNESS, AMPLITUDE, FREQUENCY, TECTONIC_INFLUENCE } = require("./global")
const { Planet } = require("./planet")

export function terrainGenerator(pointsList, steepness, amplitude, frequency, tectonicBorders, tectonicInfluence, ...additionalLists) {
    // Deep copy the points list to avoid modifying the original
    let modifiedPoints = pointsList.map(point => [...point]);

    let numPoints = pointsList.length;

    // Use frequency to determine the number of hills/valleys
    let numHills = Math.floor(frequency * numPoints * 0.01);  // Frequency defines percentage of points affected

    for (let h = 0; h < numHills; h++) {
        // Choose a random point on the sphere to be the center of the hill or valley
        let hillCenter = pointsList[Math.floor(Math.random() * pointsList.length)];

        // Define random hill/valley properties
        let hillRadius = Math.random() * 0.2 + 0.1 * amplitude;  // Radius in fraction of planet size
        let hillHeight = (Math.random() * 2 - 1) * steepness * amplitude;  // Random height or depth

        // Adjust nearby points to create smooth hills/valleys
        pointsList.forEach((point, i) => {
            // Calculate distance from the center of the hill/valley
            let distance = Math.sqrt(
                Math.pow(point[0] - hillCenter[0], 2) +
                Math.pow(point[1] - hillCenter[1], 2) +
                Math.pow(point[2] - hillCenter[2], 2)
            );

            // If the point is within the hill's radius, adjust its height
            if (distance < hillRadius) {
                // Calculate influence based on distance (closer = bigger change)
                let influence = Math.pow((1 - (distance / hillRadius)), 3);  // Cubic drop-off for smoother transition

                // Check if the point is near a tectonic border
                let tectonicDistance = Math.sqrt(
                    Math.pow(point[0] - tectonicBorders[0], 2) +
                    Math.pow(point[1] - tectonicBorders[1], 2) +
                    Math.pow(point[2] - tectonicBorders[2], 2)
                );

                if (tectonicDistance < hillRadius) {
                    // Increase the steepness and amplitude near tectonic borders
                    hillHeight *= tectonicInfluence;
                    amplitude *= tectonicInfluence;
                }

                // Adjust the point's height (z-coordinate) using the influence
                let heightAdjustment = influence * hillHeight * 0.5;  // Softening the height adjustment

                // Ensure smoothness by scaling the point's position relative to the adjustment
                modifiedPoints[i] = point.map(coord => coord * (1 + heightAdjustment));  // Stretch the point to raise/lower it

                // Now update the corresponding points in the additional lists if they match
                additionalLists.forEach(points => {
                    points.forEach((altPoint, j) => {
                        if (altPoint.every((val, idx) => Math.abs(val - point[idx]) < 1e-6)) {  // Use a small tolerance for comparison
                            points[j] = altPoint.map(coord => coord * (1 + heightAdjustment));  // Apply the same modification
                        }
                    });
                });
            }
        });
    }

    // Return all lists, with modified points
    return [modifiedPoints, ...additionalLists];
}

let planet = new Planet()

export function get_terrain(){
    let terrain_list = terrainGenerator(planet.terrain, STEEPNESS, AMPLITUDE, FREQUENCY, planet.geologicBreaks, TECTONIC_INFLUENCE, planet.geologicBreaks)
    let terrain = terrain_list[0]
    let geologicBreaks = terrain_list[1]
    let new_terrain = PointRender.subtract(planet.terrain, planet.geologicBreaks)
    let concatted = new_terrain.concat(planet.geologicBreaks)
    console.log(concatted)
    console.log("XDD")
    let colours = Renderer.convertToVerticesColourBased(concatted)["colors"]
    // Create a new array to hold the modified values
    console.log(colours)
    let uv = xyzListToUvHeight(new_terrain)
    console.log(uv)
    for (let i = 0; i < uv.length; i++) {
        console.log(colours[i])
        uv[i][3] = colours[i];
    }
    console.log(uv)
    return uv
}
