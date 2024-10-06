import { BufferGeometry, Color, Float32BufferAttribute, PerspectiveCamera, Points, PointsMaterial, Scene, WebGLRenderer } from "three";
import { SPACING } from "./global";
import { Planet } from "./planet";
import { PlanetRenderer } from "./planet_renderer";

export class Renderer {
    constructor(planetRenderer) {
        this.planetRenderer = planetRenderer;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.points = null;
    }

    initialSetup(mode) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(1000, 1000);

        const geometry = new BufferGeometry();
        let vertices, colors;

        switch (mode) {
            case "PLANET":
                ({ vertices, colors } = Renderer.convertToVerticesColourBased(this.planetRenderer.renderPlanet()));
                break;
            case "MINERALS":
                ({ vertices, colors } = this.convertToVerticesAndColors(this.planetRenderer.renderMinerals()));
                break;
            case "GEOLOGY":
                ({ vertices, colors } = this.convertToVerticesAndColors(this.planetRenderer.renderGeology()));
                break;
        }

        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

        const material = new PointsMaterial({ size: 0.05, vertexColors: true });
        this.points = new Points(geometry, material);
        this.scene.add(this.points);

        this.camera.position.z = 10;
    }

    convertToVerticesAndColors(pointRenders) {
        const vertices = [];
        const colors = [];
        pointRenders.forEach(point => {
            vertices.push(point.xCoord * SPACING, point.yCoord * SPACING, point.zCoord * SPACING);

            // Normalize color values (assuming colors are in hex format)
            const color = new Color(point.colour);
            colors.push(color.r, color.g, color.b);
        });

        return { vertices, colors };
    }

    static convertToVerticesColourBased(pointRenders) {
        const vertices = [];
        const colors = [];

        // Calculate the distances from the origin (0,0,0) for each point


        const distances = pointRenders.map(point => {
                return Math.sqrt(point[0] ** 2 + point[1] ** 2 + point[2] ** 2);
        });

        const maxDistance = Math.max(...distances);
        const minDistance = Math.min(...distances);

        pointRenders.forEach((point, index) => {
            // vertices.push(point.xCoord * SPACING, point.yCoord * SPACING, point.zCoord * SPACING);
            // console.log(vertices)
            // Normalize the distance for color mapping
            const normalizedDistance = (distances[index] - minDistance) / (maxDistance - minDistance);

            // Reversed gradient: low (close) -> green, high (far) -> red
            const color = new Color();
            color.setRGB(normalizedDistance, 1 - normalizedDistance, 0);  // reversed: green for low, red for high

            colors.push([color.r, color.g, color.b]);
        });
        console.log("colors xD")
        console.log(colors)
        return { vertices, colors };
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.points.rotation.y += 0.01;
    }
}


const renderer = new Renderer(new PlanetRenderer(new Planet()))
renderer.initialSetup("PLANET")
renderer.render()
