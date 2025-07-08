"use client";

import InputBox from "@/components/inputBox";
import InputBtu from "@/components/InputBtu";
import { useState } from "react";
import { ScanSearch } from 'lucide-react';
import Nav from "@/components/Nav";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Corner from "@/components/Corner";
import BrickWall from "@/components/BrickWall";


export default function Home() {

  return (
    <div className="flex flex-col m-auto max-w-[85rem] min-w-[85rem]    min-h-screen relative">
      <Nav />

      <div className=" flex flwx-row justify-center items-center w-full h-[95vh] border ">
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
            My approach combines technical precision with a strong sense of purpose, and I'm always eager to contribute to projects that prioritize innovation,
            usability, and long-term impact. I'm looking to connect with teams and organizations that value clear communication,
            thoughtful execution, and the drive to build meaningful digital experiences.
          </p>

          <div className="mt-6 flex flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="inline-flex items-baseline space-x-0"
            >
              <span className="text-gray-900 text-2xl leading-none">G</span>
              <span className="text-base leading-none">itHub</span>
            </Button>

            <Button
              size="lg"
              className="inline-flex items-baseline space-x-0"
            >
              <span className="text-blue-600 text-2xl leading-none">L</span>
              <span className="text-base leading-none">inkedIn</span>
            </Button>

            <Button
              size="lg"
              className="inline-flex items-baseline space-x-0"
            >
              <span className="text-green-500 text-2xl leading-none">R</span>
              <span className="text-base leading-none">esume</span>
            </Button>
          </div>

        </div>




      </div>

      <div className="w-full h-[95vh] border p-6 flex flex-col gap-1.5 ">
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



      </div>


      <div className="w-full h-[95vh] border">
        {/* the project section */}
      </div>



    </div>
  );
}
