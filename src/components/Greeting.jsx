import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

/**
 * Greeting Component
 * ------------------
 * Displays a time-based greeting message depending on:
 * - Current system time (hour of the day)
 * - Selected application language (PL / EN)
 *
 * Behavior:
 * - Computes greeting on mount and whenever language changes
 * - Uses simple time ranges to determine appropriate message
 */
export default function Greeting() {
  /** Current language from global context */
  const { lang } = useLanguage();

  /** Stores computed greeting text */
  const [text, setText] = useState("");

  /**
   * Effect: Greeting calculation
   * ----------------------------
   * Determines greeting based on current hour
   * and selected language.
   */
  useEffect(() => {
    /** Current hour (0–23) */
    const hour = new Date().getHours();

    let greeting;

    /**
     * Time-based greeting logic
     * -------------------------
     * 05:00–11:59 → Morning
     * 12:00–17:59 → Afternoon
     * 18:00–22:59 → Evening
     * 23:00–04:59 → Default / Welcome
     */
    if (hour >= 5 && hour < 12) {
      greeting = lang === "pl" ? "Dzień dobry" : "Good morning";
    } else if (hour >= 12 && hour < 18) {
      greeting = lang === "pl" ? "Dzień dobry" : "Good afternoon";
    } else if (hour >= 18 && hour < 23) {
      greeting = lang === "pl" ? "Dobry wieczór" : "Good evening";
    } else {
      greeting = lang === "pl" ? "Witaj" : "Welcome";
    }

    setText(greeting);
  }, [lang]);

  return (
    /* ================= GREETING TEXT ================= */
    <p className="text-[10px] tracking-[0.4em] text-black/40 uppercase">
      {text}
    </p>
  );
}