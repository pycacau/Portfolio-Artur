import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export function DottedSurface({ className, theme = 'dark', ...props }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // OTIMIZAÇÃO: Menos partículas (25x35 = 875 vs 40x60 = 2400)
    const SEPARATION = 180;
    const AMOUNTX = 25;
    const AMOUNTY = 35;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(theme === 'dark' ? 0x000000 : 0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // OTIMIZAÇÃO: Desativar antialiasing
      powerPreference: 'low-power' // OTIMIZAÇÃO: Preferir GPU de baixo consumo
    });
    // OTIMIZAÇÃO: Limitar pixel ratio para evitar renderização pesada em telas retina
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.setClearColor(scene.fog.color, 0);

    container.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);
        if (theme === 'dark') {
          colors.push(200, 200, 200);
        } else {
          colors.push(50, 50, 50);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;
    let lastTime = 0;
    const targetFPS = 30; // OTIMIZAÇÃO: Limitar a 30 FPS
    const frameInterval = 1000 / targetFPS;

    // OTIMIZAÇÃO: Throttled animation loop
    const animate = (currentTime) => {
      animationId = requestAnimationFrame(animate);
      
      // Não animar se não estiver visível
      if (!isVisibleRef.current) return;
      
      // Throttle para 30 FPS
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      const positionAttribute = geometry.attributes.position;
      const pos = positionAttribute.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          pos[index + 1] =
            Math.sin((ix + count) * 0.3) * 60 +
            Math.sin((iy + count) * 0.5) * 60;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.03; // Velocidade mais lenta
    };

    // OTIMIZAÇÃO: Intersection Observer para pausar quando fora da tela
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Resize handler com debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    animate(0);

    sceneRef.current = { scene, camera, renderer, particles: [points], animationId };

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimeout);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
        sceneRef.current.renderer.dispose();
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 w-full h-full', className)}
      style={{ zIndex: 0, position: 'absolute' }}
      {...props}
    />
  );
}
