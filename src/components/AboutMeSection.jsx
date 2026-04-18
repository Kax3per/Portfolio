import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

export default function AboutMe() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // 🔥 SCROLL REVEAL
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative dark:bg-white dark:text-black py-28 px-6 xl:px-20 overflow-hidden"
    >

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] dark:bg-black/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="mb-16">

          <p className={`text-[10px] tracking-[0.5em] dark:text-black/30 mb-6 uppercase transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            {t.title}
          </p>

          <h2 className={`text-[32px] sm:text-[48px] xl:text-[64px] font-light leading-tight tracking-[0.15em] transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {lang === "pl"
              ? "Tworzę doświadczenia, które mają znaczenie"
              : "I build experiences that matter"}
          </h2>

        </div>

        {/* 🔥 TEXT GRID */}
        <div className="grid md:grid-cols-2 gap-12 dark:text-black/70 text-[16px] leading-relaxed">

          <p className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {lang === "pl"
              ? "Jestem frontend developerem skupionym na tworzeniu nowoczesnych stron internetowych, które nie tylko dobrze wyglądają, ale przede wszystkim działają skutecznie. Każdy projekt traktuję jako produkt, który musi przyciągać uwagę i prowadzić użytkownika."
              : "I am a frontend developer focused on building modern websites that not only look great, but also perform effectively. I treat every project as a product that should capture attention and guide the user."}
          </p>

          <p className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {lang === "pl"
              ? "Największą uwagę przykładam do UX oraz detali. Tworzę projekty z efektem „wow”, wykorzystując animacje i interakcje, które budują doświadczenie. Zaczynam od zrozumienia produktu, a następnie buduję MVP, które można rozwijać."
              : "I focus strongly on UX and details. I build projects with a strong 'wow' effect using animations and interactions that enhance the experience. I start with understanding the product and then build an MVP that can evolve."}
          </p>

          <p className={`transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {lang === "pl"
              ? "W pracy wykorzystuję nowoczesne narzędzia oraz AI, co pozwala mi działać szybciej i precyzyjniej. Dzięki temu mogę skupić się na jakości i dopracowaniu każdego elementu."
              : "In my workflow, I use modern tools and AI, which allows me to work faster and more precisely. This helps me focus on quality and attention to detail."}
          </p>

          <p className={`transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {lang === "pl"
              ? "Obecnie rozwijam swoje umiejętności i buduję portfolio, z myślą o pracy oraz projektach freelance."
              : "Currently, I am developing my skills and building my portfolio with the goal of working professionally and taking on freelance projects."}
          </p>

        </div>

      </div>

      {/* 🔥 ANIM */}
      <style jsx>{`
        .translate-y-10 {
          transform: translateY(40px);
        }
        .translate-y-6 {
          transform: translateY(24px);
        }
      `}</style>

    </section>
  );
}