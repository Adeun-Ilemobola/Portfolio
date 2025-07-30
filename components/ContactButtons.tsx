'use client'

import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";
import Link from "next/link";

export default function ContactButtons() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4">

      <Button asChild variant="ghost" size="lg" className="
        group rounded-xl px-6 py-4 text-white
        border border-slate-700
        bg-gradient-to-br from-gray-800/60 to-black
        hover:from-slate-800 hover:to-gray-900
        hover:shadow-[0_0_20px_#0f172a]
        transition duration-300
      ">
        <Link href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2">
            <Github className="w-5 h-5 text-white" />
            <span className="text-white">GitHub</span>
          </span>
        </Link>
      </Button>

      <Button asChild variant="ghost" size="lg" className="
        group rounded-xl px-6 py-4 text-white
        border border-blue-800
        bg-gradient-to-br from-blue-900/60 to-black
        hover:from-blue-800 hover:to-blue-950
        hover:shadow-[0_0_20px_#3b82f680]
        transition duration-300
      ">
        <Link href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-white" />
            <span className="text-white">LinkedIn</span>
          </span>
        </Link>
      </Button>

      <Button asChild variant="ghost" size="lg" className="
        group rounded-xl px-6 py-4 text-white
        border border-emerald-700
        bg-gradient-to-br from-emerald-900/60 to-black
        hover:from-emerald-800 hover:to-emerald-950
        hover:shadow-[0_0_20px_#10b98150]
        transition duration-300
      ">
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <span className="text-white">Resume</span>
          </span>
        </Link>
      </Button>

    </div>
  );
}
