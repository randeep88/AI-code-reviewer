"use client";

import { Button } from "@/components/ui/button";
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
}: {
  reviewCode: (language: string, code: string) => Promise<void>;
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
    } else if (data.code.length < 50) {
      setError("Code is too short");
      return;
    } else {
      setError("");
      await reviewCode(data.language, data.code);
    }
  };

  return (
    <div className="w-[80%] h-[80%] mx-auto dark:bg-card bg-gray-50 rounded-xl relative">
      <form onSubmit={handleSubmit(onsubmit)} className="h-full flex flex-col">
        <div className="p-2 flex items-center justify-between border-b shrink-0">
          <div className="flex items-center gap-2">
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
          <Button disabled={!code} variant="outline" type="submit" size="sm">
            Review
          </Button>
        </div>

        <textarea
          {...register("code")}
          placeholder="Paste your code here..."
          className="flex-1 min-h-0 w-full resize-none rounded-b-2xl p-3 bg-transparent border-0 focus:outline-none font-mono text-sm"
        />
      </form>
    </div>
  );
};

export default CodeInput;
