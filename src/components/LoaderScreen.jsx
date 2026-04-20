import { useEffect, useState } from "react";

/**
 * LoaderScreen Component
 * ----------------------
 * Fullscreen loading overlay displayed during initial app startup.
 *
 * Responsibilities:
 * - Displays animated branding / intro text sequence
 * - Cycles through predefined messages
 * - Applies glitch + flicker visual effects
 * - Fades out smoothly after sequence ends
 * - Notifies parent component when loading is complete
 *
 * UX Concept:
 * Acts as a lightweight "intro experience" rather than a static loader.
 */
export default function LoaderScreen({ onFinish }) {
  /**
   * Text sequence displayed during loading
   * Order defines animation flow
   */
  const texts = [
    "KACPER SIWOŃ...",
    "FRONTEND DEVELOPER...",
    "BUILDING EXPERIENCE...",
    "KACPER SIWOŃ"
  ];

  /** Current index of displayed text */
  const [index, setIndex] = useState(0);

  /** Controls fade-out visibility */
  const [visible, setVisible] = useState(true);

  /**
   * Effect: Animation lifecycle controller
   * --------------------------------------
   * Handles:
   * - Text cycling (interval)
   * - Total duration timeout
   * - Fade-out transition
   * - Final callback execution
   */
  useEffect(() => {
    /**
     * Interval: cycles through text array
     * Creates dynamic "loading sequence"
     */
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 700);

    /**
     * Main timeout:
     * - Stops text cycling
     * - Triggers fade-out
     * - Calls onFinish after animation ends
     */
    setTimeout(() => {
      clearInterval(interval);
      setVisible(false);

      /**
       * Delay ensures fade-out animation completes
       * before removing loader from DOM
       */
      setTimeout(() => {
        onFinish();
      }, 700);
    }, 3200);

    /** Cleanup interval on unmount */
    return () => clearInterval(interval);
  }, []);

  return (
    /* ================= FULLSCREEN LOADER ================= */
    <div
      className={`
        fixed inset-0 z-99999
        flex items-center justify-center
        bg-white text-black
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* ANIMATED TEXT (GLITCH EFFECT) */}
      <h1 className="glitch text-[18px] sm:text-[32px] tracking-[0.4em] font-light">
        {texts[index]}
      </h1>

      {/* ================= ANIMATION  ================= */}
      <style>{`
        /* Base glitch effect */
        .glitch {
          position: relative;
          color: black;
          animation: flicker 1.5s infinite;
        }

        /* Duplicate layers for glitch distortion */
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
        }

        /* Red channel offset (top glitch layer) */
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 red;
          animation: glitchTop 1s infinite linear alternate-reverse;
        }

        /* Blue channel offset (bottom glitch layer) */
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 blue;
          animation: glitchBottom 1.2s infinite linear alternate-reverse;
        }

        /* Top slicing animation */
        @keyframes glitchTop {
          0% { clip-path: inset(0 0 80% 0); }
          50% { clip-path: inset(0 0 40% 0); }
          100% { clip-path: inset(0 0 70% 0); }
        }

        /* Bottom slicing animation */
        @keyframes glitchBottom {
          0% { clip-path: inset(20% 0 0 0); }
          50% { clip-path: inset(60% 0 0 0); }
          100% { clip-path: inset(30% 0 0 0); }
        }

        /* Flicker (CRT-like effect) */
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}