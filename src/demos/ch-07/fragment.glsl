#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float freq;

float PI = 3.1415926;

#include ../noise/noise.glsl

float aastep(float threshold, float dist) {
  float afwidth = 0.7 * length(vec2(dFdx(dist), dFdy(dist)));
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  // float freq = 40.0;

  float angle = PI / 4.0;
  mat2 rot = mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );

  vec2 st = rot * pos;
  vec2 near = 2.0 * fract(freq * st) - 1.0;

  float dist = length(near);
  vec3 textureColor = texture(uTexture, uv).rgb;
  float gray = dot(textureColor, vec3(0.299, 0.587, 0.114));

  float radius = sqrt(1.0 - gray);

  float n = 0.1 * snoise(pos * 200.0);
  n += 0.05 * snoise(pos * 400.0);
  n += 0.025 * snoise(pos * 800.0);

  vec3 white = vec3(n * 0.5 + 0.98);
  vec3 black = vec3(n + 0.1);
  vec3 color = mix(black, white, aastep(radius, dist + n));

  fragColor = vec4(color, 1.0);
}