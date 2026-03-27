#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float freq;

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  // float freq = 10.0;
  vec2 near = 2.0 * fract(freq * pos) - 1.0;

  float dist = length(near);
  float radius = 0.5;

  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);
  vec3 color = mix(black, white, step(radius, dist));

  fragColor = vec4(color, 1.0);
}