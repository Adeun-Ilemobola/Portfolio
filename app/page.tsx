"use client";

import ContactSLide from "@/components/ContactSLide";
import ImgList from "@/components/ImgList";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS } from "@/lib/testObject";
import { FileX } from "@/lib/type";
import { useState } from "react";
import { is } from "zod/v4/locales";

const skills = [
  { name: "React & Next.js", category: "Frontend", size: "large" },
  { name: "TypeScript", category: "Language", size: "small" },
  { name: "Express & Hono", category: "Backend", size: "medium" },
  { name: "C++", category: "Core Logic", size: "small" },
  { name: "Prisma & Drizzle", category: "Database", size: "medium" },
  { name: "Photography", category: "Creative", size: "small" },
  { name: "Adobe Suite", category: "Design", size: "small" },
  { name: "A/V Production", category: "Media", size: "large" },
];
export default function Home() {
  // const [result, setResult] = useState<string[]>([]);
  const [files, setFiles] = useState<FileX[]>([]);
  const [mainFile, setMainFile] = useState<FileX | null>(null);
  const [show  , setShow] = useState(false)

  return (
    <div className=" flex flex-col">
      <Nav />
     {show &&  <ContactSLide setShowContact={setShow} showContact={show}/>}
      <Button
      variant={"secondary"}
      className=" absolute  top-10"
      onClick={()=>{
        setShow(!show)
      }}
      >
      {show ? "Hide" : "Show"}

      </Button>
      {/*  */}

      <section
        id="about"
        className="min-h-screen min-w-full flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl font-bold">About Me</h1>

        <p className="mt-4 text-lg max-w-2xl text-center">
          Hello! I’m Adeun Ilemobola, a Junior Web and Multimedia Developer
          based in Surrey, BC. I have a passion for bridging the gap between
          functional code and engaging visual content. My technical toolkit is
          built on modern standards, specializing in front-end development with
          React and Next.js, alongside back-end proficiency in Express and Hono.
        </p>

        <p className="mt-4 text-lg max-w-2xl text-center">
          Currently completing my Associate of Science at Douglas College, I am
          driven by a curiosity for how things work—from high-level database
          management with Prisma and Drizzle to the logic of C++ Beyond the
          screen, I bring a creative edge with experience in photography,
          videography, and A/V production, ensuring that the digital experiences
          I build are not only functional but visually compelling.
        </p>
      </section>

      <section
        id="skills"
        className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative transition-colors duration-300"
      >
        <h2 className="text-4xl font-bold mb-12 tracking-widest uppercase text-gray-900 dark:text-white">
          Technical Arsenal
        </h2>

        {/* The Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full px-4">
          {skills.map((skill, index) => (
            <div
              key={index}
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
          ))}
        </div>
      </section>



      <section
        id={"Projects".toLowerCase()}
        className=" min-h-screen min-w-full p-6 flex flex-col "
      >
        <h2 className=" text-3xl font-bold mb-4 ">Projects</h2>
        <div className=" h-[90%] w-full flex flex-row overflow-y-auto flex-wrap gap-3  ">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectCard key={i} data={project} eidtMode={true} />
          ))}
        </div>
      </section>
    </div>
  );
}
