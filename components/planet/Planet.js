import { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Color } from "three";
import { TextureLoader, Vector3 } from "three/src/Three.js";

const planetSurfaceFragmentShader = `
uniform vec3 u_color;
uniform sampler2D u_surface;
uniform vec3 u_lightDir;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    vec3 baseColor = texture(u_surface, v_uv).xyz;
    gl_FragColor = vec4(baseColor * clamp(dot(v_normal, -normalize(u_lightDir)), 0.02, 1.0), 1.0);
}
`;
const planetSurfaceVertexShader = `
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    v_uv = uv;
    v_normal = normalize((modelMatrix * vec4(position, 1.0)).xyz);
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
      },
      u_lightDir: {
        value: new Vector3(-10, -6, -1)
      }
    }),
    [testTexture]
  );
  useFrame((state, delta) => {meshRef.current.rotation.y += delta})
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
