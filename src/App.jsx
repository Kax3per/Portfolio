import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Featured from "./components/ProjectsSection";
import AboutMe from "./components/AboutMeSection";
import ContactSection from "./components/ContactSections";
import ScrollProgress from "./components/SrollProgress";
import LoaderScreen from "./components/LoaderScreen";

import { LanguageProvider } from "./components/LanguageContext";

/**
 * App Component
 * --------------
 * Root component responsible for:
 * - Controlling initial loading experience
 * - Mounting global providers (e.g. LanguageContext)
 * - Rendering main application layout
 *
 * Architecture:
 * - Loader phase (blocking UI)
 * - Main application phase (fully interactive)
 *
 * UX Flow:
 * 1. Show LoaderScreen (intro experience)
 * 2. Wait for animation to complete
 * 3. Render full application
 */
function App() {
  /** Controls whether loader screen is visible */
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* ================= LOADING PHASE ================= */}
      {loading && (
        <LoaderScreen
          /**
           * Callback triggered when loader finishes animation
           * Switches app into main render phase
           */
          onFinish={() => setLoading(false)}
        />
      )}

      {/* ================= MAIN APPLICATION ================= */}
      {!loading && (
        /**
         * Global providers wrapper
         * (language, future themes, auth, etc.)
         */
        <LanguageProvider>

          {/* GLOBAL UI ELEMENTS */}
          <ScrollProgress />
          <Navbar />

          {/* PAGE SECTIONS */}
          <Hero />
          <AboutMe />
          <Featured />
          <ContactSection />

        </LanguageProvider>
      )}
    </>
  );
}

export default App;