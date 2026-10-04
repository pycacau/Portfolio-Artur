import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { getWaterfallGeometry } from './HeroGridWaterfall';
import './CloudNightScene.css';

export default function CloudNightScene({ children, lightContent, footerContent }) {
  const hasLightContent = lightContent != null;
  const hasFooterContent = hasLightContent && footerContent != null;
  const sceneRef = useRef(null);
  const cloudsRef = useRef(null);
  const lightCloudRef = useRef(null);
  const footerCloudRef = useRef(null);
  const gridGradientId = useId();
  const [size, setSize] = useState({ width: 1000, height: 1000, heroHeight: 900, aboutHeight: 1000, cloudHeight: 320, lightCloudTop: 680, footerCloudTop: 900, footerCloudHeight: 120 });

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const about = scene?.previousElementSibling;
    const hero = about?.previousElementSibling;
    if (!scene || !about || !hero) return undefined;

    const measure = () => {
      const next = {
        width: scene.clientWidth,
        height: scene.clientHeight,
        heroHeight: hero.clientHeight,
        aboutHeight: about.clientHeight,
        cloudHeight: cloudsRef.current?.clientHeight,
        lightCloudTop: lightCloudRef.current?.offsetTop ?? scene.clientHeight,
        footerCloudTop: footerCloudRef.current?.offsetTop ?? scene.clientHeight,
        footerCloudHeight: footerCloudRef.current?.clientHeight ?? 120,
      };
      if (Object.values(next).some(value => !value)) return;
      setSize(current => Object.keys(next).every(key => next[key] === current[key]) ? current : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    [scene, about, hero, cloudsRef.current, lightCloudRef.current, footerCloudRef.current].filter(Boolean).forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [hasLightContent, hasFooterContent]);

  const { columns, spacing, bend } = getWaterfallGeometry(size.width, size.heroHeight);
  // Keep the grid's row phase and column positions when crossing out of About.
  const firstRow = ((bend + spacing * 0.6 - size.aboutHeight) % spacing + spacing) % spacing;
  const rows = [];
  for (let y = firstRow; y < size.height; y += spacing) rows.push(y);

  return (
    <div ref={sceneRef} className="portfolio-night" style={lightContent ? {
      '--light-cloud-start': `${size.lightCloudTop + size.cloudHeight * 0.48}px`,
      '--light-cloud-end': `${size.lightCloudTop + size.cloudHeight * 0.52}px`,
      ...(hasFooterContent ? {
        '--footer-cloud-start': `${size.footerCloudTop + size.footerCloudHeight * 0.48}px`,
        '--footer-cloud-end': `${size.footerCloudTop + size.footerCloudHeight * 0.52}px`,
      } : {}),
    } : undefined}>
      <svg className="portfolio-night__grid" viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gridGradientId} gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="0" y2={size.height}>
            <stop offset={size.cloudHeight * 0.48 / size.height} stopColor="#111111" />
            <stop offset={size.cloudHeight * 0.52 / size.height} stopColor="#e6e8ee" />
            {lightContent && <>
              <stop offset={(size.lightCloudTop + size.cloudHeight * 0.48) / size.height} stopColor="#e6e8ee" />
              <stop offset={(size.lightCloudTop + size.cloudHeight * 0.52) / size.height} stopColor="#111111" />
            </>}
            {hasFooterContent && <>
              <stop offset={(size.footerCloudTop + size.footerCloudHeight * 0.48) / size.height} stopColor="#111111" />
              <stop offset={(size.footerCloudTop + size.footerCloudHeight * 0.52) / size.height} stopColor="#e6e8ee" />
            </>}
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#${gridGradientId})`} strokeWidth="0.8" opacity="0.13">
          {columns.map(({ endX }, index) => (
            <path key={`column-${index}`} d={`M${endX} 0 V${size.height}`} vectorEffect="non-scaling-stroke" />
          ))}
          {rows.map((y, index) => (
            <path key={`row-${index}`} d={`M0 ${y} H${size.width}`} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      <div ref={cloudsRef} className="cloud-transition" aria-hidden="true">
        <img src="/cloud-transition.webp" alt="" width="2172" height="724" decoding="async" />
      </div>
      {children}
      {lightContent && <>
        <div ref={lightCloudRef} className="cloud-transition cloud-transition--light" aria-hidden="true">
          <img src="/cloud-transition.webp" alt="" width="2172" height="724" decoding="async" loading="lazy" />
        </div>
        <div className="portfolio-day">{lightContent}</div>
        {hasFooterContent && <>
          <div ref={footerCloudRef} className="cloud-transition cloud-transition--footer" aria-hidden="true">
            <img src="/cloud-transition-thin.webp" alt="" width="2172" height="724" decoding="async" loading="lazy" />
          </div>
          <div className="portfolio-footer-scene">{footerContent}</div>
        </>}
      </>}
    </div>
  );
}
