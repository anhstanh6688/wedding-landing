import { useEffect, useRef, type RefObject } from "react";

/**
 * Custom hook that observes an element and adds the "is-visible" class
 * when it enters the viewport, triggering CSS scroll-reveal animations.
 *
 * @param threshold – Percentage of the element visible before triggering (0-1)
 * @param once – If true, only triggers once; stays visible after first reveal
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  once = true
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the element and all its children with .scroll-reveal
    const children = el.querySelectorAll(".scroll-reveal");
    if (el.classList.contains("scroll-reveal")) observer.observe(el);
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}
