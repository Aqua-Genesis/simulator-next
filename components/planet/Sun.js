import { SphereGeometry } from "three";

const fragment = `
void main() {
  gl_FragColor = vec4(1.0);
}
`;

const vertex = `
void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

export default function Sun(props) {
  const geometry = new SphereGeometry(1.0, 32, 16)
  geometry.computeVertexNormals()
  geometry.computeTangents()

  return (
    <mesh
      {...props}
      geometry={geometry}
      position={-props.lightDir * 10.0}
    >
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  )
}
