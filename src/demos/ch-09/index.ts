import { Renderer, Camera, Transform, Texture, Program, Mesh, Geometry, Vec3, Orbit } from "ogl";
import { Pane } from "tweakpane";

import fragment from './fragment.glsl';
import vertex from './vertex.glsl?raw';

import image from '../../images/img-01.jpg';

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const renderer = new Renderer({ canvas });
const gl = renderer.gl;

const camera = new Camera(gl, { fov: 45 });
camera.position.set(0, 0, 5);

const controls = new Orbit(camera, {
  target: new Vec3(0, 0, 0),
  element: canvas
})

const scene = new Transform();
const texture = new Texture(gl);

const img = new Image();
img.src = image;
img.onload = () => texture.image = img;


const geometry = new Geometry(gl, {
  position: { size: 3, data: new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]) },
  uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]) },
  index: { data: new Uint16Array([0, 1, 2, 0, 2, 3]) },
});

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uResolution: { value: [gl.canvas.width, gl.canvas.height] },
    uTexture: { value: texture },
    freq: { value: 40.0 },
  }
});

const mesh = new Mesh(gl, { geometry, program });
mesh.setParent(scene);

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
  const distance = camera.position.z
  const fov = camera.fov * Math.PI / 180

  const height = 2 * Math.tan(fov / 2) * distance
  const width = height * camera.aspect

  mesh.scale.set(width / 2, height / 2, 1)
}

window.addEventListener("resize", resize, false);
resize();

requestAnimationFrame(update);

function update() {
  requestAnimationFrame(update);
  controls.update();
  program.uniforms.uResolution.value = [
    gl.canvas.width,
    gl.canvas.height
  ];
  renderer.render({ scene, camera });
}

const freq = program.uniforms.freq;

const PARAMS = {
  freq: freq.value
}

const pane = new Pane();
pane.addBinding(PARAMS, "freq", { min: 0, max: 100, step: 0.1 });

pane.on('change', () => {
  freq.value = PARAMS.freq;
});