// components/ProjectCard.tsx
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

interface ProjectCardProps {
  id: string;
  title: string;
  tools: string[];
  devMode: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}



export default function ProjectCard({
  id,
  title,
  tools,
  devMode,
  onDelete,
  onEdit
}: ProjectCardProps) {
  return (
   <div
  className="
    p-px
    bg-gradient-to-tr from-purple-800/40 via-indigo-700/40 to-pink-700/40
    rounded-2xl
    shadow-[0_0_25px_#9333ea40] hover:shadow-[0_0_35px_#9333ea70]
    transition-shadow duration-300
    max-w-sm md:max-w-md w-full shrink-0
  "
>
  <ProjectCardLinkMode
    id={id}
    mode={devMode}
    className="
      bg-black/20
      backdrop-blur-md
      rounded-2xl
      p-4 flex flex-col gap-3
      text-white transition-all
    "
  >
    <h3 className="text-2xl font-semibold text-cyan-100">{title}</h3>

    <div className="flex flex-wrap gap-2">
      {tools.length > 5 ? (
        <>
          {tools.slice(0, 5).map((tool, i) => (
            <Badge
              key={i}
              className="bg-gradient-to-br from-violet-700 to-fuchsia-700 text-white rounded-full px-3 py-1 text-sm shadow-sm hover:shadow-md"
            >
              {tool}
            </Badge>
          ))}
          <Badge className="bg-gradient-to-br from-violet-700 to-fuchsia-700 text-white rounded-full px-3 py-1 text-sm shadow-sm">
            +{tools.length - 5}
          </Badge>
        </>
      ) : (
        tools.map((tool, i) => (
          <Badge
            key={i}
            className="bg-gradient-to-br from-violet-700 to-fuchsia-700 text-white rounded-full px-3 py-1 text-sm shadow-sm hover:shadow-md"
          >
            {tool}
          </Badge>
        ))
      )}
    </div>

    {devMode && (
      <div className="pt-4 border-t border-white/10 flex gap-2">
        <Button variant="destructive" className="flex-1" onClick={onDelete}>
          Delete
        </Button>

        <Button
          onClick={onEdit}
          variant="outline"
          className="flex-1 border-white text-white hover:bg-white/10"
        >
          Update
        </Button>
      </div>
    )}
  </ProjectCardLinkMode>
</div>

  );
}

function ProjectCardLinkMode({
  id,
  mode,
  className,
  children,
}: {
  id: string;
  mode: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (!mode) {
    return (
      <Link href={`/project/${id}`}>
        <div className={className}>{children}</div>
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}
