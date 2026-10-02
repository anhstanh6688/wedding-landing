import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: "heart" | "dot";
}

/**
 * Renders gentle floating hearts & dots across the viewport.
 * Uses CSS animation (no JS per-frame) for performance.
 */
export function FloatingHearts() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const count = window.innerWidth < 640 ? 8 : 14;
    const items: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      type: Math.random() > 0.4 ? "heart" : "dot",
    }));
    setPetals(items);
  }, []);

  if (petals.length === 0) return null;

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === "heart" ? (
            <Heart
              size={p.size}
              className="text-primary/30"
              fill="currentColor"
              strokeWidth={0}
            />
          ) : (
            <span
              className="block rounded-full bg-sage/25"
              style={{ width: p.size * 0.5, height: p.size * 0.5 }}
            />
          )}
        </span>
      ))}
    </>
  );
}
