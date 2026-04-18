import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const slides = t.hero.slides;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // 🔥 RESET PRZY ZMIANIE JĘZYKA
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [lang]);

  useEffect(() => {
    const current = slides[index].title;

    const typingSpeed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);

        if (next === current) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);

        if (next === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % slides.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, slides]);

  return (
    <section className="h-screen flex items-center justify-center text-center px-6 dark:bg-white dark:text-black dark:bg-black dark:text-white transition-colors duration-500 overflow-hidden">

      <div className="max-w-3xl">

        {/* 🔥 HEADLINE */}
        <h1 className="text-[34px] sm:text-[56px] xl:text-[72px] font-light leading-tight min-h-[120px]">

          {text}
          <span className="animate-blink">|</span>

        </h1>

        {/* 🔥 SUBTEXT */}
        <p
          key={index}
          className="mt-6 dark:text-black/60 dark:text-white/60 text-[16px] sm:text-[18px] transition-all duration-500 animate-fade"
        >
          {slides[index].desc}
        </p>

        {/* 🔥 CTA */}
        <a
          href="#projects"
          className="inline-block mt-10 border dark:border-black dark:border-white px-8 py-3 text-sm tracking-[0.2em] dark:hover:bg-black dark:hover:text-white transition"
        >
          {t.hero.cta}
        </a>

      </div>

      {/* 🔥 ANIMATIONS */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

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