import { cn } from '@/lib/utils';
import React from 'react';

function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length = 5) {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

export function FeatureCard({ feature, className, ...props }) {
  const p = genRandomPattern();

  return (
    <div className={cn('relative overflow-hidden p-6 bg-white border-2 border-black', className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/1 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full mix-blend-overlay fill-black/5 stroke-black/25"
          />
        </div>
      </div>
      <feature.icon className="size-6 text-black" strokeWidth={1.5} aria-hidden />
      <h3 className="mt-8 text-base font-bold text-black">{feature.title}</h3>
      <p className="relative z-20 mt-2 text-sm text-gray-700 leading-relaxed">{feature.description}</p>
    </div>
  );
}
