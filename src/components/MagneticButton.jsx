import React, { useRef } from "react";

/**
 * MagneticButton Component
 * ------------------------
 * Interactive wrapper that creates a "magnetic" hover effect.
 *
 * Behavior:
 * - Element slightly follows cursor movement within its bounds
 * - Resets position when cursor leaves
 * - Disabled on mobile devices for performance and UX consistency
 *
 * Use case:
 * Enhances perceived interactivity for buttons, links, and CTAs.
 *
 * @param {React.ReactNode} children - Inner content (e.g. button, link)
 * @param {string} className - Additional styling classes
 * @param {...any} props - Additional props passed to wrapper element
 */
export default function MagneticButton({ children, className = "", ...props }) {
  /** Reference to DOM element for direct style manipulation */
  const ref = useRef(null);

  /**
   * Handles mouse movement inside component
   * ----------------------------------------
   * Calculates cursor offset relative to element center
   * and applies a scaled translation transform.
   *
   * @param {MouseEvent} e
   */
  const handleMove = (e) => {
    /**
     * Disable effect on mobile devices
     * (no cursor + prevents unnecessary calculations)
     */
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    /**
     * Cursor position relative to element center
     */
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    /**
     * Apply dampened translation for smooth "magnetic" feel
     */
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  /**
   * Resets element position
   * ------------------------
   * Triggered when cursor leaves the element
   */
  const reset = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = "translate(0px, 0px)";
  };

  return (
    /* ================= MAGNETIC WRAPPER ================= */
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}