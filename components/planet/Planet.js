import { useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Color } from "three";
import { ShaderMaterial, SphereGeometry, TextureLoader, Vector3 } from "three/src/Three.js";
import { getTextureFromPoints, getTextureFromPoints2 } from "./generateTextures";
import { getTemperaturePoints } from "./temperature";
import { get_terrain } from "@/scripts/geology/terrain";

const planetSurfaceFragmentShader = `
uniform vec3 u_color;
uniform sampler2D u_surface;
uniform sampler2D u_normal;
uniform sampler2D u_composition;
uniform sampler2D u_life;
uniform sampler2D u_temperature;
uniform vec3 u_lightDir;
uniform int u_overlay;
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_tangent;
varying mat3 tbn;

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

vec3 vulkanic(float val) {
  vec3 hsv = rgb2hsv(vec3(1, 0.106, 0.004));
  hsv.x += (1.0 - val) / 10.0;
  hsv.y *= 1.3;
  return hsv2rgb(hsv);
}

void main() {
  vec3 baseColor = texture(u_surface, v_uv).xyz;
  vec4 temp = texture(u_temperature, v_uv);
  vec3 composition = texture(u_composition, v_uv).rgb;
  vec4 life = texture(u_life, v_uv);
  vec3 normal = texture(u_normal, v_uv).xyz * 2.0 - 1.0;
  normal = normalize(tbn * normal);
  vec4 final_color = vec4(baseColor * clamp(dot(normal, -normalize(u_lightDir)), 0.02, 1.0), 1.0);

  if(u_overlay == 1) {
    final_color.rgb += vulkanic(temp.r) * temp.r;
  } else if (u_overlay == 2) {
    final_color.rgb = composition;
  } else if (u_overlay == 3) {
    final_color += vec4(life.rgb * life.a, 1.0);
  }

  gl_FragColor = final_color;
}
`;
const planetSurfaceVertexShader = `
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_tangent;
varying mat3 tbn;

attribute vec3 tangent;

void main() {
  v_uv = uv;
  vec3 tang = normalize((modelMatrix * vec4(tangent, 1.0)).xyz); 
  v_normal = normalize((modelMatrix * vec4(normal, 1.0)).xyz);  
  vec3 bitang = cross(tang, v_normal); 
  tbn = mat3(normalize(tang), normalize(bitang), normalize(v_normal));
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

export default function Planet(props) {
  const meshRef = useRef()
  const matRef = useRef()
  let { gl } = useThree();
  let loader = new TextureLoader()
  let colorTexture = loader.load("planet.jpg")
  let normalTexture = loader.load("planet-norm.jpg")
  let temperature = getTextureFromPoints(getTemperaturePoints(props.volcanic), gl)
  let composition = getTextureFromPoints2(get_terrain(), gl)
  const uniforms = useMemo(
    () => ({
      u_color: {
        value: new Color(1, 0, 1),
      },
      u_surface: {
        value: colorTexture
      },
      u_normal: {
        value: normalTexture
      },
      u_lightDir: {
        value: props.lightDir
      },
      u_temperature: {
        value: temperature
      },
      u_composition: {
        value: composition
      },
      u_overlay: {
        value: 0
        // 1 - vulkanic
        // 2 - materialy
        // 3 - zycie
      }
    }),
    [colorTexture, temperature, normalTexture, composition, props.lightDir]
  );

  useFrame(() => {
    matRef.current.uniforms.u_overlay.value = props.overlay;
  })

  const geometry = new SphereGeometry(1.0, 128, 64)
  geometry.computeVertexNormals()
  geometry.computeTangents()

  const material = new ShaderMaterial({
    vertexShader: planetSurfaceVertexShader,
    fragmentShader: planetSurfaceFragmentShader,
    uniforms: uniforms,
  })

  matRef.current = material

  return (
    <mesh
      {...props}
      ref={meshRef}
      geometry={geometry}
    >
      <primitive object={matRef.current} attach="material" />
    </mesh>
  )
}
