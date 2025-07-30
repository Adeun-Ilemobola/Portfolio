import React from 'react';
import { Button } from './ui/button';

export default function Nav() {
  return (
    <div
      className="
        sticky top-0 left-0 w-full h-20 px-6
        bg-gradient-to-b from-[#0b0f1a]/90 to-transparent
        backdrop-blur-lg
        border-b border-white/10
        z-50
        shadow-[0_2px_10px_#0b0f1a80]
      "
    >
      <div className="max-w-7xl mx-auto h-full flex justify-end items-center gap-12">
        {['About', 'Projects', 'Skills'].map((label) => (
          <Button
            key={label}
            variant="link"
            className="
              relative text-lg text-white tracking-wide font-medium
              transition duration-300
              hover:text-cyan-300
              after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
              after:bg-cyan-400 after:transition-all after:duration-300
              hover:after:w-full
            "
            onClick={() => {
              const section = document.getElementById(label.toLowerCase());
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
