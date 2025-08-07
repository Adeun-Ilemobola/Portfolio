"use client";


import Nav from "@/components/Nav";
import Image from "next/image";
import BrickWall from "@/components/BrickWall";
import ProjectCard from "@/components/ProjectCard";
import { api } from "@/lib/trpc";
import SpaceLoadingScreen from "@/components/LoadingScreen";
import ContactButtons from "@/components/ContactButtons";


export default function Home() {
  const { data: getProjectsShowcase } = api.getProjectsShowcase.useQuery({
    limit: 10,
    offset: 0,
  }
  )

  return (
    <div className="flex flex-col m-auto max-w-[85rem] min-w-[85rem] snap-y snap-mandatory scroll-smooth    min-h-screen relative">
      <Nav />

      <section  id="about" className=" snap-start flex flwx-row justify-center items-center w-full h-[95vh] border ">
        {/* img amd abuot me  */}

        <div className="relative w-70 h-70 md:w-80 md:h-80  overflow-hidden  flex-shrink-0">
          <Image
            src="/test.jpg"
            alt="Profile picture of [Your Name]"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Column */}
        <div className="mt-8 md:mt-0 md:ml-12 max-w-2xl text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          <p className="text-lg leading-relaxed">
            <span className="text-3xl text-amber-600">A </span>
            developer with a focused interest in web and software development and a forward-looking mindset about where technology is headed.
            I take pride in building clean, maintainable solutions — whether that means crafting responsive interfaces or implementing reliable backend systems.
            My approach combines technical precision with a strong sense of purpose, and I&apos;m always eager to contribute to projects that prioritize innovation,
            usability, and long-term impact. I&apos;m looking to connect with teams and organizations that value clear communication,
            thoughtful execution, and the drive to build meaningful digital experiences.
          </p>

        <ContactButtons />

        </div>
      </section>

      <section id="skills" className=" snap-start w-full h-[95vh] border p-6 flex flex-col gap-1.5 ">
        {/* the skill */}
        {/* <Corner variant="start" size={20} color="red" />
        <Corner variant="mid" size={20} color="red" />
        <Corner variant="end" size={20} color="red" /> */}

        <h1 className="ml-10 text-3xl font-bold">Skills and Technology</h1>

        <div className="flex items-center justify-center w-full flex-1">

          <BrickWall
            list={[
              ["HTML", "CSS", "JavaScript", "React", "Node.js"],
              ["Python", "Django", "Flask", "SQL", "MongoDB"],
              ["Git", "Docker", "Kubernetes", "AWS", "Azure"],
              ["Tailwind CSS", "Bootstrap", "Material UI", "Next.js", "GraphQL"],
              ["TypeScript", "Redux", "Express.js", "REST APIs", "WebSockets"]
            ]}
          />

        </div>
      </section>
      <section id="projects" className=" snap-start w-full h-[95vh] border flex flex-col gap-4 p-4">
        {/* the project section */}

        <h1 className="text-4xl font-bold text-center mt-6">Projects</h1>
        <div className=" flex flex-row flex-wrap justify-center gap-5 ">

          {
            getProjectsShowcase && getProjectsShowcase.data ? (
              getProjectsShowcase.data.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  onDelete={() => { }}
                  tools={project.tools} // Assuming tools are not provided in the showcase
                  devMode={false} // Assuming devMode is not applicable in the showcase
                />
              ))
            ) : (
              <SpaceLoadingScreen fullScreen={false} />
            )
          }

        </div>
      </section>
    </div>
  );
}
