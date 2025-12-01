
"use client"
import { motion , Variants } from "framer-motion";
import Link from "next/link";

export default function GlassSpaceMenu() {
  // Animation variant for the "Zero-G" floating effect
  const floatVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:any) => ({
      opacity: 1,
      y: [0, -15, 0], // Floating up and down
      transition: {
        delay: i * 0.2, // Stagger effect
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="flex min-h-screen w-full flex-row flex-wrap items-center justify-center gap-8 overflow-hidden ">
      
      {/* Card 1: Rose Nebula */}
      <Link href={""}>
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(225, 29, 72, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            // Glass Specs: High Blur (18px), Low Opacity (More see-through)
            "backdrop-blur-md transition-all duration-500 " +
            // Edges: Crisp thin border for glass realism
            "border border-white/60 dark:border-white/10 " +
            // Surface: Very low opacity for 'see-through' effect
            "bg-rose-500/5 hover:bg-rose-500/10 dark:bg-rose-400/5 dark:hover:bg-rose-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-rose-900 drop-shadow-md dark:text-rose-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              CREATE
              <br />
              PROJECT
            </h1>
          </div>
        </motion.div>
      </Link>

      {/* Card 2: Fuchsia Void */}
      <Link href={""}>
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(192, 38, 211, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            "backdrop-blur-md transition-all duration-500 " +
            "border border-white/60 dark:border-white/10 " +
            "bg-fuchsia-500/5 hover:bg-fuchsia-500/10 dark:bg-fuchsia-400/5 dark:hover:bg-fuchsia-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-fuchsia-900 drop-shadow-md dark:text-fuchsia-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              ADD NEW
              <br />
              SKILL
            </h1>
          </div>
        </motion.div>
      </Link>

      {/* Card 3: Teal Aurora */}
      <Link href={""}>
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(13, 148, 136, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            "backdrop-blur-md transition-all duration-500 " +
            "border border-white/60 dark:border-white/10 " +
            "bg-teal-500/5 hover:bg-teal-500/10 dark:bg-teal-400/5 dark:hover:bg-teal-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-teal-900 drop-shadow-md dark:text-teal-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              VIEW
              <br />
              REQUESTS
            </h1>
          </div>
        </motion.div>
      </Link>

    </div>
  );
}