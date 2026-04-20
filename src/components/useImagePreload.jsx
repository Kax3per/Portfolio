import { useEffect, useState } from "react";

/**
 * useImagePreload Hook
 * ---------------------
 * Preloads a list of image URLs and notifies when all are loaded.
 *
 * Responsibilities:
 * - Initiates image loading in background
 * - Tracks loading progress
 * - Returns boolean flag when all images are ready
 *
 * Use case:
 * Prevents visual flickering when displaying image-heavy sections
 * (e.g. galleries, sliders, project showcases).
 *
 * @param {string[]} images - Array of image URLs
 * @returns {boolean} loaded - Indicates whether all images are loaded
 */
export default function useImagePreload(images) {
  /** Indicates whether all images have finished loading */
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    /**
     * Edge case:
     * If no images provided → consider as loaded
     */
    if (!images || images.length === 0) {
      setLoaded(true);
      return;
    }

    let count = 0;
    let isMounted = true; // prevents state update after unmount

    /**
     * Handles single image load completion
     */
    const handleLoad = () => {
      count++;

      /**
       * When all images are loaded → update state
       */
      if (count === images.length && isMounted) {
        setLoaded(true);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;

      /**
       * Handle both success and error
       * (error shouldn't block entire preload)
       */
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });

    /**
     * Cleanup:
     * Prevents state updates if component unmounts
     */
    return () => {
      isMounted = false;
    };
  }, [images]);

  return loaded;
}