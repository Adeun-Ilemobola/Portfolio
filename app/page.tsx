"use client";

import InputBox from "@/components/inputBox";
import InputBtu from "@/components/InputBtu";
import { useState } from "react";
import { ScanSearch } from 'lucide-react';


export default function Home() {
  const [test1, setTest1] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  return (
    <div className="flex flex-col m-auto min-w-7xl    min-h-screen">

      <InputBox
        value={test1}
        onChange={setTest1}
        placeholder="Input 1"
        className="w-64"
        label="Input 1"
      />
      <InputBtu
        onSubmit={(value) => {
          console.log("Submitted:", value);
          setTest2("");
        }}
        className="w-64"
        icon={<ScanSearch className=" h-4 w-4" />} // You can replace this with any icon component

      />

      <InputBtu
        onSubmit={(value) => {
          console.log("Submitted:", value);
          setTest2("");
        }}
        className="w-64"
        icon={<span>add</span>} // You can replace this with any icon component

      />


    </div>
  );
}
