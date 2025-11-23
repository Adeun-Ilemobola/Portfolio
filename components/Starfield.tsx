"use client";

// components/Starfield.tsx
import { useState, useEffect } from "react";

interface Star {
  cx: number;
  cy: number;
  r: number;
  duration: number;
  delay: number;
  randColor: string;
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const count = 300; // tweak up or down
    const newStars: Star[] = Array.from({ length: count }).map(() => {
      const randColorList = ["#A48CFF", "#FF4FA8", "#2FFFE3", "#1A2CFF", "#FFC94D"];
      const randColorNum = Math.floor(Math.random() * 4);
      return{
      cx: Math.random() * 100,                // percent
      cy: Math.random() * 100,                // percent
      r: Math.random() * 2 + 1,             // radius 
      duration: Math.random() * 6 + 1,        // 1–6s
      delay: Math.random() * 6,               // 0–6s
      randColor: randColorList[Math.floor(Math.random() * randColorList.length)] // random pastel color
    }
    });
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
          fill={s.randColor}
          className="star "
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
        
          opacity: 0.1; /* start at 10% */
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.6; /* peak at 60% */
          }
        }
      `}</style>
    </svg>
  );
}