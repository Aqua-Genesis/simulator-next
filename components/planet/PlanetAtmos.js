import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { Matrix3, Matrix4, Vector3 } from "three/src/Three.js";

const planetAtmosFragmentShader = `
vec3 v_rayDir;
varying vec2 v_uv;
uniform vec3 u_rayOrigin;
uniform vec3 u_planetPosition;
uniform float u_atmosphereRadius;
uniform float u_fov;
uniform float u_aspect;
uniform mat4 u_orientation;
uniform vec3 u_lightDir;
uniform vec3 u_scatCoef;
uniform float u_density;
uniform float u_falloff;

bool hitSphere(vec3 rayOrigin, vec3 rayDir, float radius, out float min_d, out float max_d) {
  vec3 oc = rayOrigin - u_planetPosition;
  float a = dot(rayDir, rayDir);
  float b = 2.0 * dot(oc, rayDir);
  float c = dot(oc, oc) - radius * radius;

  float discriminant = b * b - 4.0 * a * c;

  if (discriminant < 0.0) {
    min_d = 1000000.0;
    max_d = 1000000.0;
    return false;
  }

  float f = (-b + sqrt(discriminant)) / (2.0 * a);
  float s = (-b - sqrt(discriminant)) / (2.0 * a);

  min_d = min(f, s);
  max_d = max(f, s);

  if (f <= 0.0 && s <= 0.0) {
    min_d = 1000000.0;
    max_d = 1000000.0;
    return false;
  }

  return true;
}

const float step = 0.004;
float ignore;
vec3 inl;

float density_at_point(vec3 pos) {
  vec3 rel = pos - u_planetPosition;
  float alt = length(rel) - 1.0;
  float alt1 = alt / (u_atmosphereRadius - 1.0);
  return exp(-alt * u_falloff) * (1.0 - alt1) * u_density;
}

vec3 in_scatter(vec3 pos, float depth) {
  float dst;
  if(!hitSphere(pos, inl, 1.0, ignore, ignore)) {
    hitSphere(pos, inl, u_atmosphereRadius, ignore, dst);
    vec3 transmitance = exp(-(depth + dst) * u_scatCoef);
    return density_at_point(pos) * transmitance;
  }
  return vec3(0.0);
}

void main() {
  inl = -normalize(u_lightDir);
  vec2 uv = v_uv * 2.0 - 1.0;
  float x = tan(u_fov / 2.0) * uv.x * u_aspect;
  float y = tan(u_fov / 2.0) * uv.y;

  v_rayDir = normalize((u_orientation * vec4(normalize(vec3(x, y, -1.0)), 0.0)).xyz);
  float close_atmos;
  float far_atmos;

  if (hitSphere(u_rayOrigin, v_rayDir, u_atmosphereRadius, close_atmos, far_atmos)) {
    float close_planet, far_planet;
    hitSphere(u_rayOrigin, v_rayDir, 1.0, close_planet, far_planet);
    float _start = close_atmos;
    float _stop = min(far_atmos, close_planet);
    vec4 final_color = vec4(0.0, 0.0, 0.0, 0.0);

    for(float distance = _start; distance < _stop; distance += step) {
      vec3 pos = u_rayOrigin + v_rayDir * distance;
      vec3 ins = in_scatter(pos, distance - _start);
      final_color.rgb += ins * step * u_scatCoef;
      final_color.a += length(ins) * step;
    }
    
    gl_FragColor = final_color;
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
      value: 1.1
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
    },
    u_orientation: {
      value: new Matrix4()
    },
    u_lightDir: {
      value: new Vector3(-10, -6, -1)
    },
    u_scatCoef: {
      value: new Vector3(0.7, 1.3, 2.0)
    },
    u_density: {
      value: 4.0
    },
    u_falloff: {
      value: 15.0
    }
  }),
    []

  )

  useFrame(() => {
    camera.up = new Vector3(0, 1, 0)
    camera.lookAt(new Vector3(0, 0, 0))
    let orientation = new Matrix4();
    orientation.makeRotationFromEuler(camera.rotation)
    ref.current.uniforms.u_aspect.value = camera.aspect;
    ref.current.uniforms.u_rayOrigin.value = camera.position;
    ref.current.uniforms.u_fov.value = degToRad(camera.fov);
    ref.current.uniforms.u_orientation.value = orientation;
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
