import { Canvas } from "@react-three/fiber";
import Planet from "./Planet";
import PlanetAtmos from "./PlanetAtmos";
import { Matrix4 } from "three/src/Three.js";

export default function PlanetCanvas() {
    return (
    <Canvas
        camera={{fov: 50, near: 0.1, far: 10, position: [0, 0, 3], projectionMatrix: Matrix4}}
    >
        <Planet/>
        <PlanetAtmos/>
    </Canvas>
    )
}
