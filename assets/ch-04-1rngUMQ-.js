import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./Orbit-CdgHAKCp.js";import{n as c,t as l}from"./img-01-DU5kAshs.js";var u=`#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform sampler2D uTexture;

float PI = 3.1415926;

float aastep(float threshold, float dist) {
  float afwidth = 0.7 * length(vec2(dFdx(dist), dFdy(dist)));
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  float freq = 40.0;

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

  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);
  vec3 color = mix(black, white, aastep(radius, dist));

  fragColor = vec4(color, 1.0);
}`,d=`#version 300 es

in vec2 uv;
in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,f=document.querySelector(`canvas`),p=new e({canvas:f}),m=p.gl,h=new a(m,{fov:45});h.position.set(0,0,5);var g=new s(h,{target:new t(0,0,0),element:f}),_=new n,v=new c(m),y=new Image;y.src=l,y.onload=()=>v.image=y;var b=new o(m,{position:{size:3,data:new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0])},uv:{size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},index:{data:new Uint16Array([0,1,2,0,2,3])}}),x=new i(m,{vertex:d,fragment:u,uniforms:{uResolution:{value:[m.canvas.width,m.canvas.height]},uTexture:{value:v}}}),S=new r(m,{geometry:b,program:x});S.setParent(_);function C(){p.setSize(window.innerWidth,window.innerHeight),h.perspective({aspect:m.canvas.width/m.canvas.height});let e=h.position.z,t=h.fov*Math.PI/180,n=2*Math.tan(t/2)*e,r=n*h.aspect;S.scale.set(r/2,n/2,1)}window.addEventListener(`resize`,C,!1),C(),requestAnimationFrame(w);function w(){requestAnimationFrame(w),g.update(),x.uniforms.uResolution.value=[m.canvas.width,m.canvas.height],p.render({scene:_,camera:h})}