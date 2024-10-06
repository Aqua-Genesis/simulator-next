import { useRef } from "react";
import { useFrame } from "react-three-fiber";
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
  const ref = useRef()
  const geometry = new SphereGeometry(1.0, 32, 16)
  geometry.computeVertexNormals()
  geometry.computeTangents()

  useFrame(() => {
    ref.current.position.set(-props.lightDir.x * 100, 
                             -props.lightDir.y * 100, 
                             -props.lightDir.z * 100)
  })

  return (
    <mesh
      {...props}
      geometry={geometry}
      ref={ref}
    >
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  )
}
