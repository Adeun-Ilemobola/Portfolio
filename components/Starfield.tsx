"use client";

// components/Starfield.tsx
import { useState, useEffect } from "react";

interface Star {
  cx: number;
  cy: number;
  r: number;
  duration: number;
  delay: number;
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const count = 250; // tweak up or down
    const newStars: Star[] = Array.from({ length: count }).map(() => ({
      cx: Math.random() * 100,                // percent
      cy: Math.random() * 100,                // percent
      r: Math.random() * 2 + 0.3,             // radius 0.3–1.3px
      duration: Math.random() * 3 + 1,        // 1–4s
      delay: Math.random() * 5,               // 0–5s
    }));
    setStars(newStars);
  }, []);

  if (!stars.length) return null;

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          className="star"
          cx={`${s.cx}%`}
          cy={`${s.cy}%`}
          r={s.r}
          style={{
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        .star {
          fill: white;
          opacity: 0.2; /* start at 20% */
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.7; /* peak at 70% */
          }
        }
      `}</style>
    </svg>
  );
}
