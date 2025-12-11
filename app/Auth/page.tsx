
"use client"
import AuthSel from "@/components/AuthSel";
import { motion , Variants } from "framer-motion";
import Link from "next/link";

export default function GlassSpaceMenu() {
  
  return (
    <div className="flex min-h-screen w-full flex-row flex-wrap items-center justify-center gap-8 overflow-hidden ">
      <AuthSel/>
      
    

    </div>
  );
}