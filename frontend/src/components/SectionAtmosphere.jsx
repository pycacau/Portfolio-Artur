import React from 'react';

export default function SectionAtmosphere({ theme = 'dark', seam = null, intensity = 'normal' }) {
  return (
    <>
      {seam && <div className={`section-seam section-seam--${seam}`} data-gsap-seam aria-hidden="true" />}
      <div
        className={`section-atmosphere section-atmosphere--${theme} section-atmosphere--${intensity}`}
        aria-hidden="true"
      >
        <span className="section-atmosphere__orb section-atmosphere__orb--a" data-atmosphere-orb />
        <span className="section-atmosphere__orb section-atmosphere__orb--b" data-atmosphere-orb />
        <span className="section-atmosphere__orb section-atmosphere__orb--c" data-atmosphere-orb />
        <span className="section-atmosphere__grid" />
        <span className="section-atmosphere__noise" />
      </div>
    </>
  );
}
