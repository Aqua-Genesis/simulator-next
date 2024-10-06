import { DataTexture, Mesh, OrthographicCamera, PlaneGeometry, RepeatWrapping, RGBAFormat, Scene, ShaderMaterial, Texture, WebGLRenderTarget } from "three";
import { generateTemperatureData } from "./temperature";

const width = 2048;
const height = 1024;
const fillSize = 48;

function blurTexture(texture, renderer) {
  // Create a render target to store the blurred texture
  const renderTarget = new WebGLRenderTarget(texture.image.width, texture.image.height);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Vertex Shader
  const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

  // Fragment Shader for Gaussian Blur
  const fragmentShader = `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float uBlurAmount;

        float gaussian(float x, float sigma) {
            return exp(-(x * x) / (2.0 * sigma * sigma)) / (sqrt(2.0 * 3.14159265) * sigma);
        }

        void main() {
            vec4 color = vec4(0.0);
            float totalWeight = 0.0;
            float sigma = uBlurAmount;
            int samples = 13; // Number of samples for the blur

            // Sample in a circle for a Gaussian blur
            for (int i = -samples; i <= samples; i++) {
                for (int j = -samples; j <= samples; j++) {
                    float weight = gaussian(length(vec2(i, j)), sigma);
                    vec2 offset = vec2(i, j) / 512.0; // Adjust based on texture size
                    color += texture2D(tDiffuse, vUv + offset) * weight;
                    totalWeight += weight;
                }
            }

            gl_FragColor = color / totalWeight; // Normalize
        }
    `;

  // Create a material with the shaders
  const material = new ShaderMaterial({
    uniforms: {
      tDiffuse: { value: texture },
      uBlurAmount: { value: 4.0 } // Adjust this value for more or less blur
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  // Create a fullscreen quad
  const geometry = new PlaneGeometry(2, 2);
  const quad = new Mesh(geometry, material);
  scene.add(quad);

  // Render the scene to the render target
  renderer.setRenderTarget(renderTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);

  // Return the new blurred texture
  return renderTarget.texture;
}

export function getTextureFromPoints(points, renderer) {
  const size = width * height * 4; // 4 components per pixel (RGBA)
  const data = new Uint8Array(size);

  console.log(points);
  for (let i = 0; i < size; i++) {
    data[i] = 0;
  }

  points.forEach(point => {
    const { u, v, r, g, b } = point; // uv should be in the range [0, 1]
    const xCenter = Math.floor(u * width);
    const yCenter = Math.floor((1 - v) * height); // Invert Y-axis for texture coordinates

    // Ensure the coordinates are within the bounds of the texture
    for (let dx = -fillSize; dx <= fillSize; dx++) {
      for (let dy = -fillSize; dy <= fillSize; dy++) {
        if (dx * dx + dy * dy >= fillSize * fillSize) continue
        const x = xCenter + dx;
        const y = yCenter + dy;

        // Check bounds
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const index = (y * width + x) * 4;

          // Set the color in RGBA format
          data[index] = r * 255;     // Red
          data[index + 1] = g * 255; // Green
          data[index + 2] = b * 255; // Blue
          data[index + 3] = 255; // Alpha (fully opaque)
        }
      }
    }
  });

  // Create a Three.js DataTexture
  const texture = new DataTexture(data, width, height, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true; // Notify Three.js that the texture needs to be updated

  return blurTexture(texture, renderer);
}

export function getTextureFromPoints2(points, renderer) {
  const size = width * height * 4; // 4 components per pixel (RGBA)
  const data = new Uint8Array(size);

  console.log(points);
  for (let i = 0; i < size; i++) {
    data[i] = 0;
  }

  points.forEach(point => {
    const [ u, v, h, [r, g, b]] = point; // uv should be in the range [0, 1]
    const xCenter = Math.floor(u * width);
    const yCenter = Math.floor((1 - v) * height); // Invert Y-axis for texture coordinates

    // Ensure the coordinates are within the bounds of the texture
    for (let dx = -fillSize; dx <= fillSize; dx++) {
      for (let dy = -fillSize; dy <= fillSize; dy++) {
        const x = xCenter + dx;
        const y = yCenter + dy;

        // Check bounds
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const index = (y * width + x) * 4;

          // Set the color in RGBA format
          data[index] = r * 255;     // Red
          data[index + 1] = g * 255; // Green
          data[index + 2] = b * 255; // Blue
          data[index + 3] = 255; // Alpha (fully opaque)
        }
      }
    }
  });

  // Create a Three.js DataTexture
  const texture = new DataTexture(data, width, height, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true; // Notify Three.js that the texture needs to be updated

  return blurTexture(texture, renderer);
}
