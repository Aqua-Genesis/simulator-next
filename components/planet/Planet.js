import { useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Color } from "three";
import { TextureLoader, Vector3 } from "three/src/Three.js";
import { getTextureFromPoints } from "./generateTextures";
import { getTemperaturePoints } from "./temperature";

const planetSurfaceFragmentShader = `
uniform vec3 u_color;
uniform sampler2D u_surface;
uniform sampler2D u_temperature;
uniform vec3 u_lightDir;
uniform int u_overlay;
varying vec2 v_uv;
varying vec3 v_normal;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 baseColor = texture(u_surface, v_uv).xyz;
  vec4 final_color = vec4(baseColor * clamp(dot(v_normal, -normalize(u_lightDir)), 0.02, 1.0), 1.0);

  if(u_overlay == 1) {
    vec4 temp = texture(u_temperature, v_uv);
    final_color = vec4(mix(final_color.xyz, temp.rgb, temp.a), 1.0);
  }

  gl_FragColor = final_color;
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
  let { gl } = useThree();
  let loader = new TextureLoader()
  let testTexture = loader.load("planetTest.jpg")
  let temperature = getTextureFromPoints(getTemperaturePoints(), gl)
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
      },
      u_temperature: {
        value: temperature
      },
      u_overlay: {
        value: 1
      }
    }),
    [testTexture, temperature]
  );
  useFrame((state, delta) => {meshRef.current.rotation.y += delta / 8.0})
  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <sphereGeometry args={[1, 128, 64]} />
      <shaderMaterial
        fragmentShader={planetSurfaceFragmentShader}
        vertexShader={planetSurfaceVertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
