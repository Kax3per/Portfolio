import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import translations from "../translations";

/**
 * Navbar Component
 * ----------------
 * Main navigation component responsible for:
 * - Rendering desktop and mobile navigation
 * - Handling smooth scrolling between sections
 * - Managing active section state based on scroll position
 * - Providing language switch functionality
 * - Controlling mobile menu visibility
 */
export default function Navbar() {
  /** Controls mobile menu visibility */
  const [open, setOpen] = useState(false);

  /** Stores currently active section (used for highlighting nav links) */
  const [active, setActive] = useState("about");

  /** Language context (global state) */
  const { lang, setLang } = useLanguage();

  /** Translations object for current language */
  const t = translations[lang];

  /**
   * Effect: Scroll listener
   * -----------------------
   * Detects which section is currently in viewport
   * and updates `active` state accordingly.
   *
   * Runs once on mount.
   */
  useEffect(() => {
    const sections = ["about", "projects", "contact"];

    /**
     * Handles scroll event
     * Determines active section based on scroll position
     */
    const handleScroll = () => {
      const scrollY = window.scrollY;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop - 100;
        const bottom = top + el.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    /** Cleanup listener on unmount */
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Handles navigation click
   * -------------------------
   * - Scrolls smoothly to selected section
   * - Closes mobile menu (if open)
   *
   * @param {string} id - Section ID to scroll to
   */
  const handleNavClick = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <>
      {/* ================= HEADER (DESKTOP NAVBAR) ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md text-black">
        <div className="flex justify-between items-center px-6 xl:px-20 py-4">

          {/* LOGO / BRAND NAME */}
          <p className="text-sm tracking-[0.2em]">
            KACPER SIWOŃ
          </p>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden md:flex gap-8 text-sm">
            {[
              { id: "about", label: t.nav.about },
              { id: "projects", label: t.nav.projects },
              { id: "contact", label: t.nav.contact },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`
                  relative transition
                  ${active === link.id ? "text-black" : "text-black/50"}
                `}
              >
                {link.label}

                {/* ACTIVE LINK UNDERLINE */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-px bg-black transition-all duration-300
                    ${active === link.id ? "w-full" : "w-0"}
                  `}
                />
              </button>
            ))}
          </div>

          {/* RIGHT SIDE CONTROLS (LANG + MOBILE MENU BUTTON) */}
          <div className="flex items-center gap-6">

            {/* LANGUAGE SWITCH (DESKTOP) */}
            <div className="hidden md:flex text-sm gap-3">
              <span onClick={() => setLang("pl")} className="cursor-pointer">
                PL
              </span>
              <span>/</span>
              <span onClick={() => setLang("en")} className="cursor-pointer">
                EN
              </span>
            </div>

            {/* MOBILE MENU OPEN BUTTON */}
            <button onClick={() => setOpen(true)} className="md:hidden">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </header>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-all duration-500 ${
          open
            ? "opacity-100 backdrop-blur-xl bg-white/90"
            : "opacity-0 pointer-events-none"
        }`}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6"
        >
          <X size={28} />
        </button>

        {/* MOBILE NAVIGATION LINKS */}
        <div className="flex flex-col gap-10 text-[26px] tracking-[0.2em] text-center">
          {[
            { id: "about", label: t.nav.about },
            { id: "projects", label: t.nav.projects },
            { id: "contact", label: t.nav.contact },
          ].map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`
                relative transition-all duration-500
                ${active === link.id ? "text-black" : "text-black/50"}
              `}
              style={{ transitionDelay: `${i * 120 + 150}ms` }}
            >
              {link.label}

              {/* ACTIVE LINK INDICATOR (CENTERED UNDERLINE) */}
              <span
                className={`
                  absolute left-1/2 -bottom-2 h-px bg-black transition-all duration-300
                  ${active === link.id ? "w-10 -translate-x-1/2" : "w-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* LANGUAGE SWITCH (MOBILE) */}
        <div className="absolute bottom-10 flex gap-4 text-sm">
          <span onClick={() => setLang("pl")} className="cursor-pointer">
            PL
          </span>
          <span>/</span>
          <span onClick={() => setLang("en")} className="cursor-pointer">
            EN
          </span>
        </div>

      </div>
    </>
  );
}