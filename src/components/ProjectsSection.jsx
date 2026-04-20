import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "../translations";
import Aurora from "../assets/AuroraPrev.avif";
import CryptoX from "../assets/CryptoXPrev.avif";
import ProBud from "../assets/ProBudPrev.avif";
import PersonalTrainer from "../assets/PersonalTrainerPrev.avif";
import MagneticButton from "./MagneticButton";
import useImagePreload from "./useImagePreload";

/**
 * ProjectsSection Component
 * --------------------------
 * Scroll-driven showcase section presenting portfolio projects.
 *
 * Core Concept:
 * - Section height is extended (400vh) to simulate a "scroll journey"
 * - Content is pinned using sticky positioning
 * - Scroll progress determines:
 *   → active project index
 *   → animation offset
 *
 * Responsibilities:
 * - Maps scroll position to UI state
 * - Displays localized project data
 * - Coordinates image transitions and animations
 * - Preloads images for smooth experience
 */
export default function ProjectsSection() {
  /** Reference to section (used for scroll calculations) */
  const sectionRef = useRef(null);

  /** Language context */
  const { lang } = useLanguage();

  /** Localized project data */
  const t = translations[lang].projects;

  /** Current active project index */
  const [index, setIndex] = useState(0);

  /** Scroll-based offset for subtle parallax movement */
  const [offset, setOffset] = useState(0);

  /** Project preview images */
  const images = [Aurora, CryptoX, ProBud, PersonalTrainer];

  /** Preload images to avoid flickering during transitions */
  useImagePreload(images);

  /**
   * Effect: Scroll-driven state engine
   * -----------------------------------
   * Converts scroll position into:
   * - progress (0 → 1)
   * - active project index
   * - animation offset
   */
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      /**
       * Normalize scroll progress within section bounds
       */
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - windowHeight))
      );

      /**
       * Map progress → project index
       */
      const newIndex = Math.min(
        t.items.length - 1,
        Math.floor(progress * t.items.length)
      );

      setIndex(newIndex);

      /**
       * Offset used for subtle vertical motion (parallax feel)
       */
      setOffset(progress * 80);
    };

    window.addEventListener("scroll", handleScroll);

    /** Cleanup listener */
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t.items.length]);

  return (
    /* ================= PROJECTS SECTION ================= */
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-[400vh] bg-white text-black"
    >
      {/* STICKY CONTAINER (pins content during scroll) */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div className="grid xl:grid-cols-2 w-full px-6 xl:px-20 items-center">

          {/* ================= TEXT CONTENT ================= */}
          <div className="max-w-xl">

            {/* SECTION LABEL */}
            <p className="text-[10px] tracking-[0.4em] text-black/30 mb-3 uppercase">
              {t.header}
            </p>

            {/* CONCEPT LABEL */}
            <p className="text-[10px] tracking-[0.4em] text-black/40 mb-2 uppercase">
              {t.concept}
            </p>

            {/* PROJECT TITLE */}
            <h2
              key={index}
              className="text-[36px] sm:text-[56px] xl:text-[72px] font-light tracking-[0.2em] mb-6 animate-slide"
            >
              {t.items[index].title}
            </h2>

            {/* PROJECT DESCRIPTION */}
            <p
              key={index + "-desc"}
              className="text-black/60 text-[16px] sm:text-[18px] leading-relaxed max-w-md animate-fade delay-200"
            >
              {t.items[index].desc}
            </p>

            {/* CTA */}
            <MagneticButton>
              <a
                href={t.items[index].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 border border-black px-8 py-3 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition"
              >
                {t.button}
              </a>
            </MagneticButton>
          </div>

          {/* ================= IMAGE STACK ================= */}
          <div className="relative h-100 xl:h-125 flex items-center justify-center">

            {images.map((img, i) => {
              const isActive = index === i;

              return (
                <ProjectCard
                  key={i}
                  img={img}
                  url={t.items[i].url}
                  active={isActive}
                  offset={offset}
                />
              );
            })}

            {/* BACKGROUND GLOW */}
            <div className="absolute w-125 h-125 bg-black/5 blur-3xl rounded-full" />
          </div>
        </div>

        {/* ================= PROGRESS INDICATOR ================= */}
        <div
          className="
            absolute

            /* MOBILE */
            bottom-6 left-1/2 -translate-x-1/2
            flex flex-row gap-3

            /* DESKTOP */
            xl:top-1/2 xl:right-6
            xl:left-auto
            xl:translate-x-0 xl:-translate-y-1/2
            xl:flex-col
          "
        >
          {t.items.map((_, i) => (
            <div
              key={i}
              className={`transition 
                h-0.5 w-6 sm:w-8 
                xl:w-0.5 xl:h-10
                ${index === i ? "bg-black" : "bg-black/20"}
              `}
            />
          ))}
        </div>

      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade {
          animation: fade 0.6s ease forwards;
        }

        .animate-slide {
          animation: slide 0.7s ease forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}

/**
 * ProjectCard Component
 * ----------------------
 * Interactive card with 3D hover effect and visibility transitions.
 *
 * Responsibilities:
 * - Displays project preview image
 * - Applies 3D tilt interaction on hover
 * - Handles active/inactive visibility states
 * - Adds parallax offset based on scroll
 */
function ProjectCard({ img, url, active, offset }) {
  /** Reference to DOM element for interaction effects */
  const ref = useRef(null);

  /**
   * Handles mouse movement for 3D tilt effect
   * ------------------------------------------
   * Calculates relative cursor position inside element
   * and applies perspective transform.
   */
  const handleMove = (e) => {
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `
      perspective(900px)
      rotateX(${y * -8}deg)
      rotateY(${x * 8}deg)
      scale(1.03)
    `;
  };

  /**
   * Resets transform on mouse leave
   */
  const reset = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      className={`absolute transition-all duration-700 ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-110 pointer-events-none"
      }`}
      style={{
        transform: `translateY(${offset * 0.6}px)`
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="relative group transition-transform duration-300 ease-out will-change-transform"
        >
          {/* PROJECT IMAGE */}
          <img
            src={img}
            className="
              w-[320px] sm:w-105 xl:w-230
              rounded-2xl
              shadow-[0_40px_120px_rgba(0,0,0,0.25)]
            "
          />

          {/* HOVER OVERLAY */}
          <div
            className="
              absolute inset-0
              rounded-2xl
              bg-black/0
              group-hover:bg-black/40
              transition duration-300
              flex items-center justify-center
            "
          >
            <span
              className="
                text-white text-sm tracking-[0.3em]
                opacity-0 group-hover:opacity-100
                transition duration-300
              "
            >
              VIEW PROJECT
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}