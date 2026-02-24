"use client";

import { cn } from "@/lib/utils";
import { StarsBackground } from "@/src/components/animate-ui/components/backgrounds/stars";
import CodeInput from "@/src/components/CodeInput";
import ReviewOutput from "@/src/components/ReviewOutput";
import { div } from "motion/react-client";
import { useState } from "react";

const MainPage = () => {
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reviewCode = async (language: string, code: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const result = await res.text();
      setOutput(result);
    } catch (error) {
      console.log(error);
      alert(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] px-20">
      <div className="w-full h-full flex items-center">
        <CodeInput
          reviewCode={reviewCode}
          isLoading={isLoading}
          output={output}
        />
      </div>

      {output && (
        <div id="review">
          <ReviewOutput output={output} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
