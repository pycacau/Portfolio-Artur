import React, { useRef, useId, useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) {
    return toLow;
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = () => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  const instanceId = `shadowoverlay-${cleanId}`;
  return instanceId;
};

export function EtheralShadow({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className,
  children
}) {
  const id = useInstanceId();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // OTIMIZAÇÃO: Reduzir escala e velocidade da animação
  const animationEnabled = animation && animation.scale > 0 && isVisible;
  const feColorMatrixRef = useRef(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef(null);

  // OTIMIZAÇÃO: Reduzir displacement scale para menos processamento
  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 10, 50) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 2000, 100) : 1;

  // OTIMIZAÇÃO: Intersection Observer para pausar quando fora da tela
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }
      hueRotateMotionValue.set(0);
      // OTIMIZAÇÃO: Animação mais lenta e suave
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 15, // Mais lento
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        ease: "linear",
        delay: 0,
        onUpdate: (value) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute("values", String(Math.round(value)));
          }
        }
      });

      return () => {
        if (hueRotateAnimation.current) {
          hueRotateAnimation.current.stop();
        }
      };
    } else if (!animationEnabled && hueRotateAnimation.current) {
      hueRotateAnimation.current.stop();
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${id}) blur(4px)` : "none"
        }}
      >
        {animationEnabled && (
          <svg style={{ position: "absolute" }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  ref={feColorMatrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%"
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          width: "100%"
        }}
      >
        {children}
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
            pointerEvents: "none"
          }}
        />
      )}
    </div>
  );
}
