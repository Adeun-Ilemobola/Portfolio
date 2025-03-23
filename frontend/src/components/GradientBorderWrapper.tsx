import { motion } from "framer-motion";
import React from "react";

function WaveBorderWrapper({ children, classs = "" }: { children: React.ReactNode; classs?: string }) {
  return (
    <div className={`relative inline-block p-1 rounded-sm  border-gray-500`}>
      {/* Animated Border */}
      <motion.div
        className={` rounded-sm p-1 overflow-hidden`}
        style={{
          background: "linear-gradient(90deg, #0A192F, #1A2A4F, #FFFFFF, #1A2A4F, #0A192F)",
          backgroundSize: "300% 100%",
         
        }}
        animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="relative z-10 ">
          {children}
        </div>


      </motion.div>

    </div>
  );
}

export default WaveBorderWrapper;
