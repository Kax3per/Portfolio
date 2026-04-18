import React, { useState, useRef } from "react";

export default function ThemePullSwitch() {
  const [y, setY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startY = useRef(0);
  const currentY = useRef(0);

  const handleStart = (e) => {
    e.preventDefault();
    setDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleMove = (e) => {
    if (!dragging) return;

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = Math.max(0, clientY - startY.current);

    const clamped = Math.min(delta, 140);

    currentY.current = clamped;
    setY(clamped);
  };

  const handleEnd = () => {
    if (!dragging) return;

    setDragging(false);

    if (currentY.current > 80) {
      document.documentElement.classList.toggle("dark");
    }

    // 🔥 SPRĘŻYNA
    let position = currentY.current;
    let velocity = 0;

    const animate = () => {
      const stiffness = 0.12;
      const damping = 0.8;

      const force = -stiffness * position;
      velocity += force;
      velocity *= damping;
      position += velocity;

      if (Math.abs(position) < 0.5 && Math.abs(velocity) < 0.5) {
        setY(0);
        return;
      }

      setY(position);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div
      className="absolute top-0 right-6 z-[9999] flex flex-col items-center select-none"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >

      {/* 🔥 SZNUREK (PRZYKLEJONY DO GÓRY) */}
      <div
        className="w-[2px]"
        style={{
          height: 40 + y,
          background: isDark ? "#fff" : "#000",
          transition: "background 0.3s",
        }}
      />

      {/* 🔥 ŻARÓWKA (TYLKO ONA SIĘ RUSZA) */}
      <div
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        className="w-8 h-8 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-xl"
        style={{
          transform: `translateY(${y}px)`,
        
          background: isDark ? "#111" : "#fff",
          boxShadow: isDark
            ? "0 0 20px rgba(255,255,255,0.3)"
            : "0 0 30px rgba(255,200,100,0.7)",
            willChange: "transform",
        }}
      >
        💡
      </div>
    </div>
  );
}