import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * LanguageContext
 * ----------------
 * Global context responsible for managing application language state.
 *
 * Provides:
 * - Current language (`lang`)
 * - Setter function (`setLang`)
 *
 * Used across the app for localization (i18n).
 */
const LanguageContext = createContext();

/**
 * LanguageProvider
 * -----------------
 * Wraps the application and provides language state via React Context.
 *
 * Responsibilities:
 * - Initializes language state
 * - Loads persisted language from localStorage
 * - Persists language changes
 *
 * @param {React.ReactNode} children - Application components
 */
export function LanguageProvider({ children }) {
  /** Current language (default: English) */
  const [lang, setLang] = useState("en");

  /**
   * Effect: Load language from localStorage
   * ---------------------------------------
   * Runs once on mount.
   * Restores user preference if available.
   */
  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved) {
      setLang(saved);
    }
  }, []);

  /**
   * Effect: Persist language changes
   * --------------------------------
   * Saves selected language to localStorage
   * whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage Hook
 * -----------------
 * Custom hook for accessing language context.
 *
 * Usage:
 * const { lang, setLang } = useLanguage();
 *
 * Abstracts away direct usage of useContext.
 */
export function useLanguage() {
  return useContext(LanguageContext);
}