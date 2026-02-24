"use client";

import CodeInput from "@/src/components/CodeInput";
import ReviewOutput from "@/src/components/ReviewOutput";
import { useState } from "react";

const MainPage = () => {
  const [output, setOutput] = useState<string>("");

  const reviewCode = async (language: string, code: string) => {
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const result = await res.text();
      setOutput(result);
    } catch (error) {
      console.error(error);
      alert(`Error reviewing code: ${error}`);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] px-20">
      <div className="w-full h-full flex items-center">
        <CodeInput reviewCode={reviewCode} />
      </div>

      {output && <ReviewOutput output={output} />}
    </div>
  );
};

export default MainPage;
