import { useMemo, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Color } from "three";
import { SphereGeometry, TextureLoader, Vector3 } from "three/src/Three.js";
import { getTextureFromPoints } from "./generateTextures";
import { getTemperaturePoints } from "./temperature";

const planetSurfaceFragmentShader = `
uniform vec3 u_color;
uniform sampler2D u_surface;
uniform sampler2D u_normal;
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
  gl_FragColor = vec4(v_normal, 1.0);
  vec3 baseColor = texture(u_surface, v_uv).xyz;
  vec3 normal = texture(u_normal, v_uv).xyz * 2.0 - 1.0;
  normal = normalize(tbn * normal);
  vec4 final_color = vec4(baseColor * clamp(dot(normal, -normalize(u_lightDir)), 0.02, 1.0), 1.0);

  if(u_overlay == 1) {
    vec4 temp = texture(u_temperature, v_uv);
    final_color.rgb += vulkanic(temp.r) * temp.r;
  } else if (u_overlay == 2) {

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
  let { gl } = useThree();
  let loader = new TextureLoader()
  let colorTexture = loader.load("planet.jpg")
  let normalTexture = loader.load("planet-norm.jpg")
  let temperature = getTextureFromPoints(getTemperaturePoints(props.volcanic), gl)
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
      u_overlay: {
        value: props.overlay
        // 1 - vulkanic
        // 2 - odlodzona
        // 3 - odwodniona
        // 4 - tectonic
        // 5 - minerały
      }
    }),
    [colorTexture, temperature, normalTexture, props.overlay, props.lightDir]
  );

  const geometry = new SphereGeometry(1.0, 128, 64)
  geometry.computeVertexNormals()
  geometry.computeTangents()

  return (
    <mesh
      {...props}
      ref={meshRef}
      geometry={geometry}
    >
      <shaderMaterial
        fragmentShader={planetSurfaceFragmentShader}
        vertexShader={planetSurfaceVertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
