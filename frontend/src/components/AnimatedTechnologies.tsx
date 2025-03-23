import { motion , animate } from "framer-motion";
import UtilityCard from "./utilityCard";
import {useEffect, useRef } from 'react'
import { SiCss , SiReact ,SiNextdotjs , SiPrisma , SiTypescript , SiHtml5 , SiTailwindcss  ,SiCplusplus , SiGithub } from '@icons-pack/react-simple-icons';

const technologies = [
     { name: "CSS", Icon: SiCss },
     { name: "Next.js", Icon: SiNextdotjs },
     { name: "Prisma", Icon: SiPrisma },
     { name: "TypeScript", Icon: SiTypescript },
     { name: "React", Icon: SiReact },
     { name: "Tailwind CSS", Icon: SiTailwindcss },
     { name: "HTML", Icon: SiHtml5 },
     {name:"c++" , Icon:SiCplusplus}
   ];

export default function AnimatedTechnologies() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Animate scrollLeft from 0 to scrollWidth
    const controls = animate(0, el.scrollWidth - el.clientWidth, {
      duration: 4, // slower speed for smoother motion
      ease: "linear",
      onUpdate: (latest) => {
        el.scrollLeft = latest + 1.5;
      },
      repeat: Infinity,
      repeatType: "reverse",
    });

    return () => controls.stop(); // clean up on unmount
  }, []);
  return (
    
      <div
        className="flex flex-row items-center gap-3 h-20 max-w-full overflow-x-scroll no-scrollbar "
        ref={scrollRef}
       
      >
        {technologies.map(({ name, Icon }) => (
          <UtilityCard key={name} name={name} isLink={false} Icon={Icon}  />
        ))}
      </div>
    
  );
}
