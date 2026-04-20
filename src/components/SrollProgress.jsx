import { useEffect, useState } from "react";

/**
 * ScrollProgress Component
 * ------------------------
 * Displays a horizontal progress bar indicating how much of the page
 * has been scrolled.
 *
 * Responsibilities:
 * - Tracks vertical scroll position
 * - Converts scroll position into percentage (0–100)
 * - Updates UI efficiently using requestAnimationFrame
 * - Renders animated progress bar with subtle gradient + glow effect
 *
 * UX Purpose:
 * Provides visual feedback about reading/progress state,
 * improving navigation awareness on long pages.
 */
export default function ScrollProgress() {
  /** Scroll progress percentage (0–100) */
  const [progress, setProgress] = useState(0);

  /**
   * Effect: Scroll tracking with rAF optimization
   * ----------------------------------------------
   * Uses requestAnimationFrame to throttle updates
   * and avoid excessive re-renders during scroll.
   */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          /** Current scroll offset */
          const scrollTop = window.scrollY;

          /** Total scrollable height */
          const height =
            document.documentElement.scrollHeight - window.innerHeight;

          /**
           * Convert to percentage
           * (guard against division by zero in edge cases)
           */
          const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;

          setProgress(scrolled);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    /** Cleanup listener */
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* ================= PROGRESS CONTAINER ================= */
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999]">

      {/* ================= PROGRESS BAR ================= */}
      <div
        className="relative h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #000, #666, #000)"
        }}
      >

        {/* ================= GLOW EFFECT ================= */}
        <div
          className="absolute right-0 top-0 h-full w-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.6))",
            filter: "blur(6px)"
          }}
        />

      </div>
    </div>
  );
}