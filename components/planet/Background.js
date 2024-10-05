import { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Color } from "three";
import { BackSide, TextureLoader, Vector3 } from "three/src/Three.js";

const backgroundFragmentShader = `
uniform sampler2D u_surface;
varying vec2 v_uv;

void main() {
    vec3 baseColor = texture(u_surface, v_uv).xyz;
    gl_FragColor = vec4(baseColor * 0.1, 1.0);
}
`;
const backgroundVertexShader = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

export default function Background(props) {
  let loader = new TextureLoader()
  let testTexture = loader.load("background.jpg")
  const uniforms = useMemo(
    () => ({
      u_surface: {
        value: testTexture
      },
    }),
    [testTexture]
  );
  return (
    <mesh
      {...props}
    >
      <sphereGeometry args={[300, 128, 64]} />
      <shaderMaterial
        fragmentShader={backgroundFragmentShader}
        vertexShader={backgroundVertexShader}
        uniforms={uniforms}
        side={BackSide}
      />
    </mesh>
  )
}
