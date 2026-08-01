"use client";

import { useEffect, useRef } from "react";

export function GrappleScroll() {
  const rigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    let frame = 0;

    const update = () => {
      const scroll = Math.min(window.scrollY, mobile ? 3600 : 5200);
      const shift = reducedMotion ? 0 : scroll * (mobile ? 1.025 : 1.07);
      const sway = reducedMotion ? 0 : Math.sin(scroll / 175) * (mobile ? 1.1 : 1.65);
      rig.style.setProperty("--grapple-shift", `${shift.toFixed(1)}px`);
      rig.style.setProperty("--grapple-sway", `${sway.toFixed(2)}deg`);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="grapple-rig" ref={rigRef} aria-hidden="true">
      <span className="grapple-rig__cable" />
      <picture className="grapple-rig__machine">
        <source srcSet="/assets/grapple-transparent.webp" type="image/webp" />
        <img src="/assets/grapple-transparent.png" alt="" width="720" height="1279" decoding="async" fetchPriority="low" />
      </picture>
    </div>
  );
}
