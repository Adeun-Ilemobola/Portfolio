import { Skill } from '@/lib/ZodObject'
import React from 'react'

export default function SkillCard({ skill }: { skill: Skill }) {
    return (
        <div

            className={`
              relative group overflow-hidden rounded-2xl border 
              transition-all duration-500 ease-out
              flex flex-col justify-center items-start p-6
              
              /* Glassmorphism Surface & Blur (2px-5px range) */
              bg-[#ffffff]/60 backdrop-blur-[4px] border-white/60 shadow-sm
              hover:bg-[#ffffff]/80 hover:border-white hover:shadow-lg hover:scale-[1.02]
              
              /* Dark Mode Overrides */
              dark:bg-[#1f2937]/40 dark:backdrop-blur-[4px] dark:border-white/10 dark:shadow-none
              dark:hover:bg-[#1f2937]/60 dark:hover:border-white/30 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]

              /* Layout Sizing */
              ${skill.size === "large" ? "col-span-2 row-span-2" : ""}
              ${skill.size === "medium" ? "col-span-2 row-span-1" : ""}
              ${skill.size === "small" ? "col-span-1 row-span-1" : ""}
            `}
        >
            {/* The "Twist": Orb using Highlight Token */}
            <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full blur-xl transition-colors duration-500
              bg-[#e11d48]/10 group-hover:bg-[#e11d48]/20
              dark:bg-[#fda4af]/10 dark:group-hover:bg-[#fda4af]/20
            ">
            </div>

            {/* Category Label: Using Accent Token */}
            <span className="text-xs font-mono mb-2 uppercase tracking-wider z-10
              text-[#059669] 
              dark:text-[#6ee7b7]
            ">
                {skill.category}
            </span>

            {/* Skill Name: High Contrast */}
            <h3 className="text-xl md:text-2xl font-bold z-10
              text-gray-800 
              dark:text-white
            ">
                {skill.name}
            </h3>

            {/* Decorative Line: Using Highlight Token */}
            <div className="h-1 mt-3 rounded-full transition-all duration-500 w-8 group-hover:w-full
              bg-[#e11d48]/60
              dark:bg-[#fda4af]/60
            ">
            </div>
        </div>
    )
}
