import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./Orbit-CdgHAKCp.js";var c=`#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  float freq = 10.0;
  vec2 near = 2.0 * fract(freq * pos) - 1.0;

  float dist = length(near);
  float radius = 0.5;

  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);
  vec3 color = mix(black, white, step(radius, dist));

  fragColor = vec4(color, 1.0);
}`,l=`#version 300 es

in vec2 uv;
in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,u=document.querySelector(`canvas`),d=new e({canvas:u}),f=d.gl,p=new a(f,{fov:45});p.position.set(0,0,5);var m=new s(p,{target:new t(0,0,0),element:u}),h=new n,g=new o(f,{position:{size:3,data:new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0])},uv:{size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},index:{data:new Uint16Array([0,1,2,0,2,3])}}),_=new i(f,{vertex:l,fragment:c,uniforms:{uResolution:{value:[f.canvas.width,f.canvas.height]}}}),v=new r(f,{geometry:g,program:_});v.setParent(h);function y(){d.setSize(window.innerWidth,window.innerHeight),p.perspective({aspect:f.canvas.width/f.canvas.height});let e=p.position.z,t=p.fov*Math.PI/180,n=2*Math.tan(t/2)*e,r=n*p.aspect;v.scale.set(r/2,n/2,1)}window.addEventListener(`resize`,y,!1),y(),requestAnimationFrame(b);function b(){requestAnimationFrame(b),m.update(),_.uniforms.uResolution.value=[f.canvas.width,f.canvas.height],d.render({scene:h,camera:p})}