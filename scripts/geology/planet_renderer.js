import { AMPLITUDE, FREQUENCY, STEEPNESS, TECTONIC_INFLUENCE } from "./global";
import { PointRender } from "./point_render";
import { terrainGenerator } from "./terrain";

export function xyzListToUvHeight(points) {
    return points.map(([x, y, z, rgb]) => {
        const radius = Math.sqrt(x * x + y * y + z * z);

        // Calculate polar and azimuthal angles
        const theta = Math.acos(z / radius);
        const phi = Math.atan2(y, x);

        // Map angles to UV coordinates
        const u = 0.5 + (phi / (2 * Math.PI));
        const v = 1 - (theta / Math.PI);

        // Calculate height over the unit sphere
        const height = radius - 1; // negative if radius < 1

        return [u, v, height, rgb]
    });
}

export class PlanetRenderer{
    constructor(planet) {
        this.planet = planet
    }

    renderPlanet(){
        let terrain = terrainGenerator(Array.from(this.planet.terrain), STEEPNESS, AMPLITUDE, FREQUENCY, Array.from(this.planet.geologicBreaks), TECTONIC_INFLUENCE, [])[0]
        return Array.from(terrain).map(elem => {
            return new PointRender(elem[0], elem[1], elem[2], "#00F");
        });
    }

    renderMinerals(){

    }

    renderGeology(){
        let eq = terrainGenerator(Array.from(this.planet.terrain), STEEPNESS, AMPLITUDE, FREQUENCY, Array.from(this.planet.geologicBreaks), TECTONIC_INFLUENCE, Array.from(this.planet.geologicBreaks))
        this.planet.terrain = eq[0]
        this.planet.geologicBreaks = eq[1]

        let points_render = Array.from(this.planet.terrain).map(elem => {
            return new PointRender(elem[0], elem[1], elem[2], "#00F")
        })

        console.log(this.planet.geologicBreaks)
        let breakRenders = Array.from(this.planet.geologicBreaks).map(elem => {
            return new PointRender(elem[0], elem[1], elem[2], "#F00")
        })
        return PointRender.subtract(points_render, breakRenders).concat(breakRenders)
    }
}
