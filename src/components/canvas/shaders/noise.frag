precision mediump float;

varying vec2 vUv;

uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColorAccent;
uniform vec3 uColorSecondary;
uniform vec3 uColorBg;
uniform vec3 uColorBgDeep;

// Simplified 3D noise (fewer instructions)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

float noise(vec3 p) {
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);
  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);
  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);
  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));
  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  return o4.y * d.y + o4.x * (1.0 - d.y);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.06;

  // Two octaves only
  float n1 = noise(vec3(uv * 2.0, t)) * 0.7 + 0.3;
  float n2 = noise(vec3(uv * 4.0 + 5.0, t * 1.5)) * 0.5 + 0.5;
  float combined = n1 * 0.65 + n2 * 0.35;

  // Brightness
  float brightness = 0.4 + uScrollProgress * 0.1;

  // Base gradient
  vec3 color = mix(uColorBgDeep, uColorBg, combined);

  // Accent nebula
  float accent = smoothstep(0.45, 0.75, n1);
  color = mix(color, uColorAccent * 0.35, accent * brightness);

  // Secondary accent
  float secondary = smoothstep(0.5, 0.8, n2);
  color = mix(color, uColorSecondary * 0.25, secondary * brightness);

  // Glow hotspot
  float glow = smoothstep(0.6, 0.0, length(uv - vec2(0.3, 0.7))) * 0.1;
  color += uColorAccent * glow;

  // Soft vignette
  vec2 vig = uv * 2.0 - 1.0;
  color *= 1.0 - dot(vig * 0.3, vig * 0.3);

  gl_FragColor = vec4(color, 1.0);
}
