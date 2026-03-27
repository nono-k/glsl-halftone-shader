import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./tweakpane-DG9W7XnG.js";import{n as l,t as u}from"./img-01-DU5kAshs.js";var d=`#version 300 es
precision mediump float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float freq;

float PI = 3.1415926;

vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((( x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  
                      0.366025403784439,  
                     -0.577350269189626,  
                      0.024390243902439); 
  
  vec2 i = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  
  i = mod289(i); 
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                           + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  
  m *= 1.792843 - 0.853735 * ( a0*a0 + h*h );
  
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float aastep(float threshold, float dist) {
  float afwidth = 0.7 * length(vec2(dFdx(dist), dFdy(dist)));
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

void main() {
  vec2 uv = vUv;
  vec2 pos = uv * uResolution / min(uResolution.x, uResolution.y);

  

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
}`,f=`#version 300 es

in vec2 uv;
in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,p=document.querySelector(`canvas`),m=new a({canvas:p}),h=m.gl,g=new n(h,{fov:45});g.position.set(0,0,5);var _=new i(g,{target:new r(0,0,0),element:p}),v=new e,y=new l(h),b=new Image;b.src=u,b.onload=()=>y.image=b;var x=new t(h,{position:{size:3,data:new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0])},uv:{size:2,data:new Float32Array([0,0,1,0,1,1,0,1])},index:{data:new Uint16Array([0,1,2,0,2,3])}}),S=new s(h,{vertex:f,fragment:d,uniforms:{uResolution:{value:[h.canvas.width,h.canvas.height]},uTexture:{value:y},freq:{value:40}}}),C=new o(h,{geometry:x,program:S});C.setParent(v);function w(){m.setSize(window.innerWidth,window.innerHeight),g.perspective({aspect:h.canvas.width/h.canvas.height});let e=g.position.z,t=g.fov*Math.PI/180,n=2*Math.tan(t/2)*e,r=n*g.aspect;C.scale.set(r/2,n/2,1)}window.addEventListener(`resize`,w,!1),w(),requestAnimationFrame(T);function T(){requestAnimationFrame(T),_.update(),S.uniforms.uResolution.value=[h.canvas.width,h.canvas.height],m.render({scene:v,camera:g})}var E=S.uniforms.freq,D={freq:E.value},O=new c;O.addBinding(D,`freq`,{min:0,max:100,step:.1}),O.on(`change`,()=>{E.value=D.freq});