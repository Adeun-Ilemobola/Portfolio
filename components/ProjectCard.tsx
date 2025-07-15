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
}



export default function ProjectCard({
  id,
  title,
  tools,
  devMode,
  onDelete,
}: ProjectCardProps) {
  return (
    <div
      className="
        p-px
        bg-gradient-to-r from-purple-700/50 via-indigo-600/50 to-pink-600/50
        rounded-2xl
        hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]
        transition-shadow duration-300

        w-full             
        max-w-sm         
        md:max-w-md        
        min-w-[8rem]     
        shrink-0
        h-full
        
      "
    >
      <ProjectCardLinkMode
        id={id}
        mode={devMode}
        className="
          bg-black/10              /* lighter overlay */
          backdrop-blur-sm 
          rounded-xl
          p-3
          flex flex-col gap-3
          text-white
                
        "
      >
        <h3 className="text-2xl font-semibold">{title}</h3>

        <div className="flex flex-wrap gap-2">
          {tools.length > 5 ? (
            <>
              {tools.slice(0, 5).map((tool, i) => (
                <Badge
                  key={i}
                  className="bg-purple-800/80 text-white rounded-full px-2 py-1 text-sm"
                >
                  {tool}
                </Badge>
              ))}
              <Badge className="bg-purple-800/80 text-white rounded-full px-2 py-1 text-sm">
                +{tools.length - 5}
              </Badge>
            </>
          ) : (
            tools.map((tool, i) => (
              <Badge
                key={i}
                className="bg-purple-800/80 text-white rounded-full px-2 py-1 text-sm"
              >
                {tool}
              </Badge>
            ))
          )}
        </div>

        {devMode && (
          <div className="pt-4 border-t border-gray-700/30 flex gap-2">
            <Button variant="destructive" className="flex-1" onClick={onDelete}>
              Delete
            </Button>
            <Link href={`/project/${id}/update`} passHref>
              <Button
                variant="outline"
                className="flex-1 border-white text-white hover:bg-white/10"
              >
                Update
              </Button>
            </Link>
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
