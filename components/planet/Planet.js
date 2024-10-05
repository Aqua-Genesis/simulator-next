import { useMemo, useRef } from "react";
import { Color } from "three";
import { TextureLoader } from "three/src/Three.js";

const planetSurfaceFragmentShader = `
uniform vec3 u_color;
uniform sampler2D u_surface;
varying float distance;
varying vec2 vUv;

void main() {
    float depth = distance;
    vec3 baseColor = texture(u_surface, vUv).xyz;
    gl_FragColor = vec4(baseColor, 1.0);
}
`;
const planetSurfaceVertexShader = `
varying float distance;
varying vec2 vUv;

void main() {
    distance = length((viewMatrix * modelMatrix * vec4(position, 1.0)).xyz);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

export default function Planet(props) {
  const meshRef = useRef()
  let loader = new TextureLoader()
  let testTexture = loader.load("planetTest.jpg")
  const uniforms = useMemo(
    () => ({
      u_color: {
        value: new Color(1, 0, 1),
      },
      u_surface: {
        value: testTexture
      }
    }),
    [testTexture]
  );
  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <sphereGeometry args={[1, 256, 128]} />
      <shaderMaterial
        fragmentShader={planetSurfaceFragmentShader}
        vertexShader={planetSurfaceVertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
