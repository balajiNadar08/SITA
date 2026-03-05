"use client";

import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const hovering = !!target.closest("a, button");
      if (hovering !== isHovering.current) {
        isHovering.current = hovering;
        if (outerRef.current) {
          outerRef.current.setAttribute("data-hovering", String(hovering));
        }
      }
    };

    const animate = () => {
      const LERP = 0.12; // lower = more lag/smoothness

      outer.current.x += (mouse.current.x - outer.current.x) * LERP;
      outer.current.y += (mouse.current.y - outer.current.y) * LERP;

      if (outerRef.current) {
        outerRef.current.style.left = `${outer.current.x}px`;
        outerRef.current.style.top = `${outer.current.y}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        data-hovering="false"
        className="
          fixed pointer-events-none z-9999 rounded-full
          border-2 border-[#101828]
          w-10 h-10
          transition-[width,height,opacity] duration-300 ease-out
          data-[hovering=true]:w-16 data-[hovering=true]:h-16
        "
        style={{
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "transform, left, top",
        }}
      />

      <div
        ref={dotRef}
        className="fixed pointer-events-none z-10000 w-2 h-2 bg-[#101828] rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "left, top",
        }}
      />
    </>
  );
};

export default CustomCursor;