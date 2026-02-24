"use client";

import { Button } from "./animate-ui/components/buttons/button";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { NoiseBackground } from "./ui/noise-background";
import { ArrowDown, Loader, Loader2 } from "lucide-react";
import Link from "next/link";

const languages = [
  { value: "javascript", label: "JavaScript or JSX" },
  { value: "typescript", label: "TypeScript or TSX" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
];

const CodeInput = ({
  reviewCode,
  isLoading,
  output,
}: {
  reviewCode: (language: string, code: string) => Promise<void>;
  isLoading: boolean;
  output: string;
}) => {
  const { register, handleSubmit, control, watch } = useForm<{
    language: string;
    code: string;
  }>({});

  const [error, setError] = useState<string>("");

  const code = watch("code");

  const onsubmit = async (data: { language: string; code: string }) => {
    if (data.code && !data.language) {
      setError("Select the language of the pasted code");
      return;
    } else if (data.code.length < 5) {
      setError("Code is too short");
      return;
    } else {
      setError("");
      await reviewCode(data.language, data.code);
    }
  };

  return (
    <NoiseBackground
      containerClassName="lg:w-[80%] w-full h-[90%] p-1 mx-auto flex flex-col relative"
      gradientColors={["red", "orange", "yellow"]}
    >
      <div className="w-full h-full mx-auto dark:bg-card bg-gray-50 rounded-xl relative">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="h-full flex flex-col"
        >
          <div className="p-2 flex items-center justify-between border-b shrink-0">
            <div className="flex flex-col lg:flex-row lg:items-center items-start gap-2">
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-red-500 text-xs">{error}</p>
            </div>
            <Button
              disabled={!code || isLoading}
              variant="outline"
              type="submit"
              size="sm"
            >
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Reviewing..." : "Review"}
            </Button>
          </div>

          <textarea
            {...register("code")}
            placeholder="Paste your code here..."
            className="flex-1 min-h-0 w-full resize-none rounded-b-2xl p-3 bg-transparent border-0 focus:outline-none font-mono text-sm"
          />
        </form>
      </div>
      {output && (
        <a
          href="#review"
          className="cursor-pointer absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-primary/10 backdrop-blur-sm border border-primary/10 rounded-full p-2 px-3 flex items-center gap-2"
        >
          <ArrowDown className="h-6 w-6 text-primary" /> Review Ready
        </a>
      )}
    </NoiseBackground>
  );
};

export default CodeInput;
