import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "../translations";
import MagneticButton from "./MagneticButton";
import Greeting from "./Greeting";

/**
 * Hero Component
 * ----------------
 * Landing section responsible for:
 * - Displaying animated headline with typing effect
 * - Cycling through localized slides (title + description)
 * - Handling language changes dynamically
 * - Rendering CTA (Call-To-Action) button
 * - Providing subtle UI animations (cursor blink, fade transitions)
 */
export default function Hero() {
  /** Current language from global context */
  const { lang } = useLanguage();

  /** Translations object for selected language */
  const t = translations[lang];

  /** Slides data (titles + descriptions) */
  const slides = t.hero.slides;

  /** Index of currently displayed slide */
  const [index, setIndex] = useState(0);

  /** Current visible text in typing animation */
  const [text, setText] = useState("");

  /** Determines whether typing is deleting or adding characters */
  const [deleting, setDeleting] = useState(false);

  /**
   * Effect: Reset animation on language change
   * -------------------------------------------
   * Ensures typing animation restarts when user switches language.
   */
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [lang]);

  /**
   * Effect: Typing animation engine
   * --------------------------------
   * Handles:
   * - Typing forward (character by character)
   * - Pause when full word is typed
   * - Deleting text
   * - Moving to next slide
   *
   * This creates a looped "typewriter" effect.
   */
  useEffect(() => {
    const current = slides[index].title;

    /** Adjust typing speed based on mode */
    const typingSpeed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting) {
        /** Typing forward */
        const next = current.slice(0, text.length + 1);
        setText(next);

        /** When full word is typed → pause → start deleting */
        if (next === current) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        /** Deleting text */
        const next = current.slice(0, text.length - 1);
        setText(next);

        /** When fully deleted → move to next slide */
        if (next === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % slides.length);
        }
      }
    }, typingSpeed);

    /** Cleanup timeout to prevent memory leaks */
    return () => clearTimeout(timeout);
  }, [text, deleting, index, slides]);

  return (
    /* ================= HERO SECTION ================= */
    <section className="min-h-dvh pt-20 flex items-center justify-center text-center px-6 bg-white text-black transition-colors duration-500">

      <div className="max-w-3xl">

        {/* GREETING COMPONENT (e.g. "Hi, I'm...") */}
        <Greeting className="mb-6" />

        {/* MAIN HEADLINE WITH TYPEWRITER EFFECT */}
        <h1 className="text-[34px] sm:text-[56px] xl:text-[72px] font-light leading-tight min-h-30">
          {text}

          {/* BLINKING CURSOR */}
          <span className="animate-blink">|</span>
        </h1>

        {/* DESCRIPTION (CHANGES WITH SLIDE INDEX) */}
        <p
          key={index} // Forces re-render for animation
          className="mt-6 text-black/60 text-[16px] sm:text-[18px] transition-all duration-500 animate-fade"
        >
          {slides[index].desc}
        </p>

        {/* CALL TO ACTION BUTTON */}
        <MagneticButton>
          <a
            href="#projects"
            className="inline-block mt-10 border text-black border-black px-8 py-3 text-sm tracking-[0.2em] hover:bg-black hover:text-white transition"
          >
            {t.hero.cta}
          </a>
        </MagneticButton>

      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        /* Blinking cursor animation */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        /* Fade-in animation for description */
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fade 0.5s ease;
        }
      `}</style>

    </section>
  );
}