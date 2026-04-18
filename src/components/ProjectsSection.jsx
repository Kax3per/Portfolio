import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

import Aurora from "../assets/AuroraPrev.png";
import CryptoX from "../assets/CryptoXPrev.png";
import ProBud from "../assets/ProBudPrev.png";
import PersonalTrainer from "../assets/PersonalTrainerPrev.png";

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  // 🔥 OBRAZKI (osobno)
  const images = [Aurora, CryptoX, ProBud, PersonalTrainer];

  // 🔥 SCROLL ENGINE
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - windowHeight))
      );

      const newIndex = Math.min(
        t.items.length - 1,
        Math.floor(progress * t.items.length)
      );

      setIndex(newIndex);
      setOffset(progress * 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t.items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] dark:bg-white dark:text-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div className="grid xl:grid-cols-2 w-full px-6 xl:px-20 items-center">

          {/* 🔥 LEFT */}
          <div className="max-w-xl">

            {/* HEADER */}
            <p className="text-[10px] tracking-[0.4em] dark:text-black/30 mb-3 uppercase">
              {t.header}
            </p>

            {/* CONCEPT */}
            <p className="text-[10px] tracking-[0.4em] dark:text-black/40 mb-2 uppercase">
              {t.concept}
            </p>
            

            {/* TITLE */}
            <h2
              key={index + "-title"}
              className="text-[36px] sm:text-[56px] xl:text-[72px] font-light tracking-[0.2em] mb-6 animate-slide"
            >
              {t.items[index].title}
            </h2>

            {/* DESC */}
            <p
              key={index + "-desc"}
              className="dark:text-black/60 text-[16px] sm:text-[18px] leading-relaxed max-w-md animate-fade delay-200"
            >
              {t.items[index].desc}
            </p>

            {/* CTA */}
            <button className="mt-10 border dark:border-black/40 px-8 py-3 text-sm tracking-[0.3em] dark:hover:bg-black dark:hover:text-white transition">
              {t.button}
            </button>

          </div>

          {/* 🔥 RIGHT */}
          <div className="relative h-[400px] xl:h-[500px] flex items-center justify-center">

            {images.map((img, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-700 ${
                  index === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
                style={{
                  transform: `translateY(${offset}px)`,
                }}
              >
                <img
                  src={img}
                  className="w-[320px] sm:w-[420px] xl:w-[920px] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
                />
              </div>
            ))}

            {/* glow */}
            <div className="absolute w-[500px] h-[500px] dark:bg-black/5 blur-3xl rounded-full" />

          </div>

        </div>

        {/* 🔥 PROGRESS */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {t.items.map((_, i) => (
            <div
              key={i}
              className={`w-[2px] h-10 transition ${
                index === i ? "dark:bg-black" : "dark:bg-black/20"
              }`}
            />
          ))}
        </div>

      </div>

      {/* 🔥 ANIMACJE */}
      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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