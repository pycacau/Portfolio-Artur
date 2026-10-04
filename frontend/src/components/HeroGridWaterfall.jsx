import React from 'react';
import { HERO_ROOM } from './MascotPortfolioHero';

const FALLING_LINES = HERO_ROOM.rays.filter((line) => Math.abs(line[3] - 1000) < 0.001);

export function getWaterfallGeometry(width, heroHeight) {
  const bend = Math.min(96, Math.max(42, width * 0.055));
  const columns = FALLING_LINES.map(([x0, y0, x1, y1]) => {
    const x = x1 * width / 1000;
    const slope = ((x1 - x0) / (y1 - y0)) * width / heroHeight;
    const endX = x + slope * bend * 0.45;
    return { x, slope, endX };
  });
  const spacing = Math.max(28, Math.min(128, columns[1].endX - columns[0].endX));
  return { bend, columns, spacing };
}

export default function HeroGridWaterfall() {
  const gridRef = React.useRef(null);
  const [size, setSize] = React.useState({ width: 1000, height: 1000, heroHeight: 900 });

  React.useLayoutEffect(() => {
    const section = gridRef.current?.closest('section');
    const hero = section?.previousElementSibling;
    if (!section || !hero) return undefined;

    const measure = () => {
      const next = {
        width: section.clientWidth,
        height: section.clientHeight,
        heroHeight: hero.clientHeight,
      };
      if (!next.width || !next.height || !next.heroHeight) return;
      setSize((current) => (
        current.width === next.width && current.height === next.height && current.heroHeight === next.heroHeight
          ? current
          : next
      ));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const geometry = getWaterfallGeometry(size.width, size.heroHeight);
  const { bend, spacing } = geometry;
  const columns = geometry.columns.map(({ x, slope, endX }) => {
    // Continue each ray at exactly its exit position and angle, then turn it vertical.
    return {
      endX,
      path: `M${x} 0 C${x + slope * bend * 0.38} ${bend * 0.38} ${endX} ${bend * 0.64} ${endX} ${bend} V${size.height}`,
    };
  });
  const rows = [bend * 0.32, bend * 0.7];
  for (let y = bend + spacing * 0.6; y < size.height; y += spacing) rows.push(y);

  return (
    <svg
      ref={gridRef}
      className="hero-grid-waterfall"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none', color: '#111111' }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.13">
        {columns.map((column, i) => <path key={`column-${i}`} d={column.path} vectorEffect="non-scaling-stroke" />)}
        {rows.map((y, i) => <path key={`row-${i}`} d={`M0 ${y} H${size.width}`} vectorEffect="non-scaling-stroke" />)}
      </g>
    </svg>
  );
}
