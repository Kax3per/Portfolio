import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "../translations";
import { FaGithub, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import MagneticButton from "./MagneticButton";

/**
 * ContactSection Component
 * ------------------------
 * Final section responsible for:
 * - Displaying contact CTA (Call-To-Action)
 * - Revealing social/contact options after user interaction
 * - Handling responsive behavior (mobile vs desktop)
 * - Triggering entrance animations when section becomes visible
 *
 * UX Concept:
 * Instead of showing all contact options immediately,
 * the component first presents a strong CTA, then progressively reveals details.
 */
export default function ContactSection() {
  /** Current language from global context */
  const { lang } = useLanguage();

  /** Localized content for contact section */
  const t = translations[lang].contact;

  /** Section reference for visibility tracking */
  const ref = useRef(null);

  /** Controls entrance animations */
  const [visible, setVisible] = useState(false);

  /** Controls whether contact details are revealed */
  const [open, setOpen] = useState(false);

  /** Detects if user is on mobile device */
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Effect: Responsive detection
   * ----------------------------
   * Tracks viewport width and updates `isMobile`.
   *
   * This enables conditional rendering:
   * - Mobile → clickable phone link
   * - Desktop → plain text display
   */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check(); // initial check
    window.addEventListener("resize", check);

    /** Cleanup listener */
    return () => window.removeEventListener("resize", check);
  }, []);

  /**
   * Effect: Visibility observer
   * ---------------------------
   * Triggers animations when section enters viewport.
   *
   * Uses IntersectionObserver for performance efficiency.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      {
        /** Trigger when 30% of section is visible */
        threshold: 0.3,
      }
    );

    if (ref.current) observer.observe(ref.current);

    /** Cleanup observer */
    return () => observer.disconnect();
  }, []);

  return (
    /* ================= CONTACT SECTION ================= */
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 xl:px-20 h-[90vh] xl:mt-35 bg-white text-black"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* SECTION LABEL */}
        <p
          className={`text-[10px] tracking-[0.5em] text-black/40 mb-6 uppercase transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t.title}
        </p>

        {/* MAIN HEADLINE */}
        <h2
          className={`text-[32px] sm:text-[48px] xl:text-[64px] font-light leading-tight tracking-[0.15em] mb-8 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {lang === "pl"
            ? "Masz pomysł? Zróbmy coś mocnego."
            : "Have an idea? Let’s build something strong."}
        </h2>

        {/* DESCRIPTION */}
        <p
          className={`text-black/60 text-[16px] sm:text-[18px] max-w-xl mx-auto mb-12 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {t.desc}
        </p>

        {/* ================= CTA / INTERACTION ================= */}
        {!open ? (
          /**
           * Initial state:
           * Displays CTA button encouraging user interaction.
           */
          <MagneticButton>
            <button
              onClick={() => setOpen(true)}
              className={`
                inline-block
                border border-black
                px-10 py-4
                text-sm tracking-[0.3em]
                hover:bg-black hover:text-white
                transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              {t.cta}
            </button>
          </MagneticButton>
        ) : (
          /**
           * Expanded state:
           * Displays social links and contact information.
           */
          <div className="flex flex-col items-center gap-6 mt-4 animate-fade">

            {/* SOCIAL ICONS */}
            <div className="flex gap-6 text-3xl">

              {/* FACEBOOK */}
              <a href="https://www.facebook.com/kacper.siwon" target="_blank">
                <FaFacebook className="hover:scale-110 transition" />
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/_kac3per_/?hl=en" target="_blank">
                <FaInstagram className="hover:scale-110 transition" />
              </a>

              {/* GITHUB */}
              <a href="https://github.com/Kax3per" target="_blank">
                <FaGithub className="hover:scale-110 transition" />
              </a>

              {/* PHONE (RESPONSIVE BEHAVIOR) */}
              {isMobile ? (
                /**
                 * Mobile:
                 * Clickable phone link (tel:)
                 */
                <a href="tel:+48723974899">
                  <FaPhone className="hover:scale-110 transition" />
                </a>
              ) : (
                /**
                 * Desktop:
                 * Display phone number as plain text
                 */
                <span className="text-lg tracking-[0.2em]">
                  +48 723 974 899
                </span>
              )}
            </div>
          </div>
        )}

      </div>

      {/* =================  ANIMATIONS ================= */}
      <style>{`
        /* Vertical offsets for entrance animations */
        .translate-y-10 { transform: translateY(40px); }
        .translate-y-6 { transform: translateY(24px); }

        /* Fade-in animation for contact reveal */
        @keyframes fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade {
          animation: fade 0.4s ease forwards;
        }
      `}</style>
    </section>
  );
}