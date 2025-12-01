"use client";

import { ProjectForm } from "@/components/ProjectForm";
import { trpc as api } from "@/lib/client"; 
import { useState } from "react";

export default function Page() {
  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);

  // 1. Query Example
  const hello = api.hello.useQuery({ text: "from Client" });

  // 2. Suspense/Loading Example
  const slow = api.getLatestPost.useQuery();

  // 3. Mutation Example
  const utils = api.useUtils();
  const addMutation = api.add.useMutation({
    onSuccess: (data) => {
      alert(`Server says the answer is: ${data.result}`);
    },
  });

  // return (
  //   <div className="p-10 space-y-8 font-mono">
  //     <h1 className="text-2xl font-bold mb-4">TRPC Connection Test</h1>

  //     {/* HELLO SECTION */}
  //     <section className="border p-4 rounded">
  //       <h2 className="font-bold mb-2">Endpoint: hello</h2>
  //       {hello.isLoading ? (
  //         <div>Loading...</div>
  //       ) : (
  //         <pre className=" p-2 rounded">
  //           {JSON.stringify(hello.data, null, 2)}
  //         </pre>
  //       )}
  //     </section>

  //     {/* SLOW QUERY SECTION */}
  //     <section className="border p-4 rounded">
  //       <h2 className="font-bold mb-2">Endpoint: getLatestPost (2s delay)</h2>
  //       {slow.isLoading ? (
  //         <div className="text-yellow-600">⏳ Waiting for server...</div>
  //       ) : (
  //         <div className="text-green-600 font-bold">{slow.data?.title}</div>
  //       )}
  //     </section>

  //     {/* MATH MUTATION SECTION */}
  //     <section className="border p-4 rounded">
  //       <h2 className="font-bold mb-2">Endpoint: add (Mutation)</h2>
  //       <div className="flex gap-2 items-center">
  //         <input
  //           type="number"
  //           value={numA}
  //           onChange={(e) => setNumA(Number(e.target.value))}
  //           className="border p-2 w-20"
  //         />
  //         <span>+</span>
  //         <input
  //           type="number"
  //           value={numB}
  //           onChange={(e) => setNumB(Number(e.target.value))}
  //           className="border p-2 w-20"
  //         />
  //         <button
  //           onClick={() => addMutation.mutate({ a: numA, b: numB })}
  //           className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
  //           disabled={addMutation.isPending}
  //         >
  //           {addMutation.isPending ? "Calculating..." : "Calculate"}
  //         </button>
  //       </div>
  //     </section>
  //   </div>
  // );
  return <div className="p-10 font-mono">

    <ProjectForm />
  </div>;
}