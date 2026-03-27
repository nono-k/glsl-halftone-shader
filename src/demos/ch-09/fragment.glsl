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

  vec3 textureColor = texture(uTexture, uv).rgb;

  float n = 0.1 * snoise(pos * 200.0);
  n += 0.05 * snoise(pos * 400.0);
  n += 0.025 * snoise(pos * 800.0);

  vec3 white = vec3(n * 0.2 + 0.97);
  vec3 black = vec3(n + 0.1);

  vec4 cmyk;
  cmyk.xyz = 1.0 - textureColor;
  cmyk.w = min(cmyk.x, min(cmyk.y, cmyk.z));
  cmyk.xyz -= cmyk.w;

  // float freq = 40.0;

  float Kangle = PI / 4.0;
  vec2 Kst = freq * mat2(cos(Kangle), -sin(Kangle), sin(Kangle), cos(Kangle)) * pos;
  vec2 Knear = 2.0 * fract(Kst) - 1.0;
  float Kdist = aastep(0.0, sqrt(cmyk.w) - length(Knear) + n);

  float Cangle = PI / 12.0;
  vec2 Cst = freq * mat2(cos(Cangle), -sin(Cangle), sin(Cangle), cos(Cangle)) * pos;
  vec2 Cnear = 2.0 * fract(Cst) - 1.0;
  float Cdist = aastep(0.0, sqrt(cmyk.x) - length(Cnear) + n);

  float Magle = PI / 12.0;
  vec2 Mst = freq * mat2(cos(Magle), sin(Magle), -sin(Magle), cos(Magle)) * pos;
  vec2 Mnear = 2.0 * fract(Mst) - 1.0;
  float Mdist = aastep(0.0, sqrt(cmyk.y) - length(Mnear) + n);

  vec2 Yst = freq * pos;
  vec2 Ynear = 2.0 * fract(Yst) - 1.0;
  float Ydist = aastep(0.0, sqrt(cmyk.z) - length(Ynear) + n);

  vec3 rgbscreen = 1.0 - 0.9 * vec3(Cdist, Mdist, Ydist) + n;
  rgbscreen = mix(rgbscreen, black, 0.85 * Kdist + 0.3 * n);

  float afwidth = 2.0 * freq * max(length(dFdx(pos)), length(dFdy(pos)));
  float blend = smoothstep(0.7, 1.4, afwidth);

  vec3 color = mix(rgbscreen, textureColor, blend);

  fragColor = vec4(color, 1.0);
}