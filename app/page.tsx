"use client";

import ContactSLide from "@/components/ContactSLide";
import Nav from "@/components/Nav";
import { Spinner } from "@/components/ui/spinner"
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { trpc as api } from "@/lib/client";
import SkillCard from "@/components/SkillCard";
import { Skill } from "@/lib/ZodObject";

const skills: Skill[] = [
  {  name: "React", category: "Frontend", size: "large" },
  { name: "Next.js", category: "Frontend", size: "large" },
  { name: "TypeScript", category: "Language", size: "large" },
  { name: "JavaScript", category: "Language", size: "medium" },
  { name: "Tailwind CSS", category: "Frontend", size: "medium" },
  { name: "Node.js", category: "Backend", size: "medium" },
  { name: "Express", category: "Backend", size: "small" },
  { name: "Prisma", category: "Database", size: "small" },
  { name: "Git", category: "Tools", size: "small" },
  { name: "Figma", category: "Design", size: "small" },
];
export default function Home() {
  // const [result, setResult] = useState<string[]>([]);
  const projects = api.getAllProject.useQuery();
  const sills = api.getSills.useQuery();

  const [show, setShow] = useState(false)


  return (
    <div className=" flex flex-col">
      <Nav />
      {show && <ContactSLide setShowContact={setShow} showContact={show} />}
      <Button
        variant={"secondary"}
        className=" absolute  top-10"
        onClick={() => {
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
          {sills.data?.value.map((skill, index) => (
          <SkillCard key={index}
           skill={
            {
              name: skill.name,
              category: skill.category as Skill["category"],
              size: skill.size,
            }
           } />
          ))}
        </div>
      </section>



      <section
        id={"Projects".toLowerCase()}
        className=" min-h-screen min-w-full p-6 flex flex-col "
      >
        <h2 className=" text-3xl font-bold mb-4 ">Projects</h2>
        <div className={`h-[90%] w-full flex flex-row overflow-y-auto flex-wrap gap-3 ${projects.isLoading ? "justify-center items-center" : "justify-start"}  `}>
          {projects.isLoading ? (
            <>
            <div className=" flex gap-1.5 justify-center items-center">
              <Spinner className=" size-5 " />
            </div>
            
            </>
           
          ) :
            (
              <>
                {projects.data?.value.map((project, i) => (
                  <ProjectCard key={i} data={project} eidtMode={true} />
                ))}
              </>
            )
          }


        </div>
      </section>
    </div>
  );
}
