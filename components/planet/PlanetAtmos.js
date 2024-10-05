import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { Vector3 } from "three/src/Three.js";

const planetAtmosFragmentShader = `
vec3 rayDir;
varying vec2 v_uv;
uniform vec3 u_rayOrigin;
uniform vec3 u_planetPosition;
uniform float u_atmosphereRadius;
uniform float u_fov;
uniform float u_aspect;

bool hitSphere() {
  vec3 oc = u_rayOrigin - u_planetPosition;
  float a = dot(rayDir, rayDir);
  float b = 2.0 * dot(oc, rayDir);
  float c = dot(oc, oc) - u_atmosphereRadius * u_atmosphereRadius;

  float discriminant = b * b - 4.0 * a * c;

  if (discriminant <= 0.0) 
    return false;

  return true;
}

void main() {
    vec2 uv = v_uv * 2.0 - 1.0;
    float x = tan(u_fov / 2.0) * uv.x * u_aspect;
    float y = tan(u_fov / 2.0) * uv.y;

    rayDir = normalize(vec3(x, y, -1.0));

  if (hitSphere()) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
`;
const planetAtmosVertexShader = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

export default function PlanetAtmos(props) {
  const ref = useRef()
  const { camera } = useThree()

  const uniforms = useMemo(() => ({
    u_atmosphereRadius: {
      value: 1.0
    },
    u_aspect: {
      value: 1.0
    },
    u_planetPosition: {
      value: new Vector3(0, 0, 0)
    },
    u_fov: {
      value: degToRad(50)
    },
    u_rayOrigin: {
      value: new Vector3(0, 0, 10)
    }

  }),
    []

  )

  useFrame(() => {
    ref.current.uniforms.u_aspect.value = camera.aspect;
    ref.current.uniforms.u_rayOrigin.value = camera.position;
    ref.current.uniforms.u_fov.value = degToRad(camera.fov);
  });

  return (
    <mesh
      {...props}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={planetAtmosFragmentShader}
        vertexShader={planetAtmosVertexShader}
        uniforms={uniforms}
        transparent={true}
        ref={ref}
      />
    </mesh>
  )
}
