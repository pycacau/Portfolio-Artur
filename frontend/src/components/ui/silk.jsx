import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SilkMesh = ({ speed = 8.4, scale = 0.8, color = "#7B7481", noiseIntensity = 1, rotation = 0 }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uScale: { value: scale },
    uColor: { value: new THREE.Color(color) },
    uNoiseIntensity: { value: noiseIntensity },
    uRotation: { value: rotation }
  }), [speed, scale, color, noiseIntensity, rotation]);

  const vertexShader = `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uNoiseIntensity;
    
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    // Simplex 3D Noise
    vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
      float n_ = 1.0 / 7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      
      vec3 pos = position;
      
      float time = uTime * uSpeed * 0.1;
      
      // Multiple layers of flowing noise for silk effect
      float noise1 = snoise(vec3(pos.x * uScale * 0.5, pos.y * uScale * 0.3, time * 0.5));
      float noise2 = snoise(vec3(pos.x * uScale + 100.0, pos.y * uScale * 0.8 + time * 0.3, time * 0.4));
      float noise3 = snoise(vec3(pos.x * uScale * 0.3 + time * 0.2, pos.y * uScale * 0.5 + time * 0.6, time * 0.3));
      float noise4 = snoise(vec3(pos.x * uScale * 1.5, pos.y * uScale * 1.2 + time * 0.2, time * 0.7));
      
      // Combine multiple noise layers
      float combinedNoise = noise1 * 0.3 + noise2 * 0.25 + noise3 * 0.25 + noise4 * 0.2;
      
      // Apply displacement in multiple directions for silk-like waves
      pos.z += combinedNoise * uNoiseIntensity * 1.5;
      pos.y += combinedNoise * uNoiseIntensity * 0.4;
      
      vElevation = combinedNoise;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Create silk-like color variations based on elevation
      float intensity = (vElevation + 1.0) * 0.5;
      
      // Base color
      vec3 color = uColor;
      
      // Add highlights and shadows for silk sheen effect
      float highlight = smoothstep(0.4, 0.8, intensity);
      float shadow = smoothstep(0.6, 0.2, intensity);
      
      // Mix colors to create silk sheen
      color = mix(color * 0.75, color * 1.25, highlight);
      color = mix(color * 0.85, color, shadow);
      
      // Add subtle gradient from top to bottom
      float gradient = vUv.y * 0.4;
      color = mix(color, color * (1.0 - gradient * 0.3), 0.4);
      
      // Add flowing wave effect
      float flow = sin(vUv.x * 8.0 + vUv.y * 4.0 + uTime * 1.5) * 0.03;
      color += flow;
      
      // Add subtle horizontal wave pattern
      float wave = sin(vUv.y * 15.0 - uTime * 2.0) * 0.02;
      color += wave;
      
      // Add depth-based shading
      float depth = (vPosition.z + 2.0) / 4.0;
      color = mix(color * 0.9, color * 1.1, depth);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 6, 0, rotation]}>
      <planeGeometry args={[40, 40, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Silk = ({ speed = 8.4, scale = 0.8, color = "#7B7481", noiseIntensity = 1, rotation = 0 }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <SilkMesh 
          speed={speed} 
          scale={scale} 
          color={color} 
          noiseIntensity={noiseIntensity} 
          rotation={rotation}
        />
      </Canvas>
    </div>
  );
};

export { Silk };
