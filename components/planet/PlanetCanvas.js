import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Planet from "./Planet";
import PlanetAtmos from "./PlanetAtmos";
import { Euler, Matrix4, Vector3 } from "three/src/Three.js";
import Background from "./Background";
import Sun from "./Sun";

function PlanetFocus() {
    const { camera } = useThree()
    useFrame(({clock}) => {
        let x = Math.sin(clock.getElapsedTime() / 3.0);
        let z = Math.cos(clock.getElapsedTime() / 3.0);
        camera.position.set(x*6, 0, z*6);
    })
}

export default function PlanetCanvas(props) {
    return (
    <Canvas
        camera={{fov: 45, near: 1, far: 1000, position: [0, 0, props.distance], projectionMatrix: Matrix4}}
    >
        <Planet overlay={props.overlay} volcanic={props.volcanic} rotationSpeed={props.rotationSpeed} lightDir={props.lightDir}/>
        <PlanetFocus/>
        <PlanetAtmos atmosDensity={props.atmosDensity} atmosScatter={props.atmosScatter} lightDir={props.lightDir}/>
        {/* <Sun lightDir={props.lightDir}/> */}
        </Canvas>
    )
}
