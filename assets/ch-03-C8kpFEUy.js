import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./tweakpane-DG9W7XnG.js";var l=`#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float freq;

float PI = 3.1415926;

float aastep(float threshold, float dist) {
  float afwidth = 0.7 * length(vec2(dFdx(dist), dFdy(dist)));
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  // float freq = 10.0;

  float angle = PI / 4.0;
  mat2 rot = mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );

  vec2 st = rot * pos;
  vec2 near = 2.0 * fract(freq * st) - 1.0;

  float dist = length(near);
  float radius = 0.5;

  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);
  vec3 color = mix(black, white, aastep(radius, dist));

  fragColor = vec4(color, 1.0);
}`,u=`#version 300 es

in vec2 uv;
in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,d=document.querySelector(`canvas`),f=new a({canvas:d}),p=f.gl,m=new n(p,{fov:45});m.position.set(0,0,5);var h=new i(m,{target:new r(0,0,0),element:d}),g=new e,_=new t(p,{position:{size:3,data:new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0])},uv:{size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},index:{data:new Uint16Array([0,1,2,0,2,3])}}),v=new s(p,{vertex:u,fragment:l,uniforms:{uResolution:{value:[p.canvas.width,p.canvas.height]},freq:{value:10}}}),y=new o(p,{geometry:_,program:v});y.setParent(g);function b(){f.setSize(window.innerWidth,window.innerHeight),m.perspective({aspect:p.canvas.width/p.canvas.height});let e=m.position.z,t=m.fov*Math.PI/180,n=2*Math.tan(t/2)*e,r=n*m.aspect;y.scale.set(r/2,n/2,1)}window.addEventListener(`resize`,b,!1),b(),requestAnimationFrame(x);function x(){requestAnimationFrame(x),h.update(),v.uniforms.uResolution.value=[p.canvas.width,p.canvas.height],f.render({scene:g,camera:m})}var S=v.uniforms.freq,C={freq:S.value},w=new c;w.addBinding(C,`freq`,{min:0,max:100,step:.1}),w.on(`change`,()=>{S.value=C.freq});