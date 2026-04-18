import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";
import ThemePullSwitch from "./ThemePullSwitch";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  return (
    <>
      {/* 🔥 NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 dark:bg-white/70 dark:bg-black/70 backdrop-blur-md dark:text-black dark:text-white transition-colors duration-500">

        <div className="relative flex justify-between items-center px-6 xl:px-20 py-4">

          {/* LOGO */}
          <p className="text-sm tracking-[0.2em]">
            KACPER SIWOŃ
          </p>

          {/* DESKTOP */}
          <div className="hidden md:flex gap-8 text-sm dark:text-black/60 dark:text-white/60">
            <a href="#projects" className="dark:hover:text-black dark:hover:text-white transition">
              {t.nav.projects}
            </a>
            <a href="#about" className="dark:hover:text-black dark:hover:text-white transition">
              {t.nav.about}
            </a>
            <a href="#contact" className="hover:text-black dark:hover:text-white transition">
              {t.nav.contact}
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center relative right-12 gap-6">

            {/* LANG */}
            <div className="hidden md:flex text-sm gap-3">
              <span
                onClick={() => setLang("pl")}
                className={`cursor-pointer ${
                  lang === "pl"
                    ? "dark:text-black dark:text-white"
                    : "dark:text-black/40 dark:text-white/40"
                }`}
              >
                PL
              </span>
              <span>/</span>
              <span
                onClick={() => setLang("en")}
                className={`cursor-pointer ${
                  lang === "en"
                    ? "dark:text-black dark:text-white"
                    : "dark:text-black/40 dark:text-white/40"
                }`}
              >
                EN
              </span>
            </div>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden transition duration-300 ${
                open ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
            >
              <Menu size={24} />
            </button>

          </div>
            <ThemePullSwitch />
        </div>
      </header>

      {/* 🔥 OVERLAY */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ${
          open
            ? "opacity-100 backdrop-blur-xl dark:bg-white/90 dark:bg-black/90 dark:text-black dark:text-white pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >

        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 left-6 text-sm dark:text-black/60 dark:text-white/60 hover:dark:text-black hover:dark:text-white transition"
        >
          <X size={28} />
        </button>

        {/* LINKS */}
        <div className="flex flex-col gap-10 text-[26px] tracking-[0.2em] text-center">

          {[t.nav.projects, t.nav.about, t.nav.contact].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`transition-all duration-700 ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120 + 150}ms` }}
            >
              {item}
            </a>
          ))}

        </div>

        {/* LANG MOBILE */}
        <div className="absolute bottom-10 flex gap-4 text-sm">
          <span
            onClick={() => setLang("pl")}
            className={`cursor-pointer ${
              lang === "pl"
                ? "dark:text-black dark:text-white"
                : "dark:text-black/40 dark:text-white/40"
            }`}
          >
            PL
          </span>
          <span>/</span>
          <span
            onClick={() => setLang("en")}
            className={`cursor-pointer ${
              lang === "en"
                ? "dark:text-black dark:text-white"
                : "dark:text-black/40 dark:text-white/40"
            }`}
          >
            EN
          </span>
        </div>
    <ThemePullSwitch />
      </div>
    </>
  );
}