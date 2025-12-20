'use client';

import React, { useId, useMemo } from 'react';

type Length = number | string;

type PixelateFilterProps = {
  id?: string;
  size?: number;
};

export function PixelateFilter({ id = 'pixelate-filter', size = 10 }: PixelateFilterProps) {
  const s = Math.max(1, Math.floor(size));
  const half = Math.max(1, Math.floor(s / 2));

  return (
    <svg width={0} height={0} aria-hidden="true" focusable="false">
      <filter id={id} x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feFlood x={half} y={half} height="1" width="1" />
        <feComposite width={s} height={s} operator="in" />
        <feTile result="a" />
        <feComposite in="SourceGraphic" in2="a" operator="in" />
        <feMorphology operator="dilate" radius={half} />
      </filter>
    </svg>
  );
}

type PixelatedBackgroundProps = {
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  opacity?: number;
  pixelSize?: number;
  blur?: number;
  pulseBlur?: number;
  hueRotate?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
  background?: string;
  overlay?: string;
  width?: Length;
  height?: Length;
  motion?: 'none' | 'noise' | 'pulse';
};

function toCssLength(v: Length | undefined, fallback: string) {
  if (v === undefined) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

export function PixelatedBackground({
  className,
  style,
  zIndex = -1,
  opacity = 0.6,
  pixelSize = 12,
  blur = 0,
  pulseBlur = 1.2,
  hueRotate = 0,
  saturation = 1.1,
  brightness = 0.95,
  contrast = 1.1,
  background =
    'radial-gradient(1200px 600px at 20% 20%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(800px 500px at 80% 30%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(900px 700px at 50% 90%, rgba(255,255,255,0.08), transparent 60%)',
  overlay = 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55))',
  width,
  height,
  motion = 'noise',
}: PixelatedBackgroundProps) {
  const reactId = useId();
  const filterId = useMemo(() => `px-${reactId.replace(/:/g, '')}`, [reactId]);

  const w = toCssLength(width, '100%');
  const h = toCssLength(height, '100%');

  const baseFilter = [
    blur ? `blur(${blur}px)` : null,
    hueRotate ? `hue-rotate(${hueRotate}deg)` : null,
    saturation !== 1 ? `saturate(${saturation})` : null,
    brightness !== 1 ? `brightness(${brightness})` : null,
    contrast !== 1 ? `contrast(${contrast})` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const pulseFilter = [
    pulseBlur ? `blur(${pulseBlur}px)` : null,
    hueRotate ? `hue-rotate(${hueRotate}deg)` : null,
    saturation !== 1 ? `saturate(${saturation})` : null,
    brightness !== 1 ? `brightness(${brightness})` : null,
    contrast !== 1 ? `contrast(${contrast})` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: w,
        height: h,
        zIndex,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <PixelateFilter id={filterId} size={pixelSize} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          background,
          WebkitFilter: `url(#${filterId}) ${baseFilter}`.trim(),
          filter: `url(#${filterId}) ${baseFilter}`.trim(),
          transform: 'translateZ(0)',
          animation: motion === 'pulse' ? 'pxPulse 2.6s ease-in-out infinite' : undefined,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: overlay,
          mixBlendMode: 'multiply',
          opacity: Math.min(1, opacity + 0.15),
        }}
      />

      {motion !== 'none' ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.14,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27 viewBox=%270 0 200 200%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay',
            backgroundRepeat: 'repeat',
            animation: motion === 'noise' ? 'pxNoiseShift 6s linear infinite' : 'pxNoiseShift 10s linear infinite',
          }}
        />
      ) : null}

      <style>{
        `@keyframes pxNoiseShift{0%{background-position:0% 0%}25%{background-position:60px 40px}50%{background-position:20px 80px}75%{background-position:80px 10px}100%{background-position:0% 0%}}
@keyframes pxPulse{0%{opacity:${Math.max(0, opacity - 0.12)};filter:url(#${filterId}) ${baseFilter}}50%{opacity:${Math.min(1, opacity + 0.08)};filter:url(#${filterId}) ${pulseFilter}}100%{opacity:${Math.max(0, opacity - 0.12)};filter:url(#${filterId}) ${baseFilter}}}`
      }</style>
    </div>
  );
}
