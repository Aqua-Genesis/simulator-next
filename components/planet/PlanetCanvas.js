import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Planet from "./Planet";
import PlanetAtmos from "./PlanetAtmos";
import { Euler, Matrix4, Vector3 } from "three/src/Three.js";

function PlanetFocus() {
    const { camera } = useThree()
    useFrame(({clock}) => {
        let x = Math.sin(clock.getElapsedTime() / 3.0);
        let z = Math.cos(clock.getElapsedTime() / 3.0);
        camera.position.set(x*3, 0, z*3);
    })

    return
}

export default function PlanetCanvas() {
    return (
    <Canvas
        camera={{fov: 40, near: 0.1, far: 100, position: [0, 0, 3], projectionMatrix: Matrix4}}
    >
        <Planet/>
        <PlanetFocus/>
        <PlanetAtmos/>
    </Canvas>
    )
}
