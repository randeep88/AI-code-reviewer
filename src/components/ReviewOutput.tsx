"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const raw = String(children).replace(/\n$/, "");
  const isInline = !className && !raw.includes("\n");

  const language = className?.match(/language-(\w+)/)?.[1];

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isInline) {
    return (
      <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-sm text-emerald-400 font-mono whitespace-nowrap">
        {children}
      </code>
    );
  }

  return (
    <pre className="bg-neutral-900 relative p rounded-xl overflow-auto border border-neutral-800 my-4">
      <code className={className}>
        <div className="sticky top-0 flex items-center justify-between border-b py-4 mb-4">
          <p>{language}</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(raw)}
          >
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div>{children}</div>
      </code>
    </pre>
  );
}

export default function ReviewOutput({ output }: { output: string }) {
  if (!output) {
    return (
      <div className="flex items-center justify-center h-full text-primary/80">
        No review yet. Paste code and click Review.
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto overflow-y-auto p-8 bg-neutral-950 rounded-2xl border border-neutral-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white border-b border-neutral-800 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-6 mb-2 text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-neutral-300 leading-7 mb-4 [&>code]:bg-neutral-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:text-emerald-400 [&>code]:font-mono">
              {children}
            </p>
          ),
          li: ({ children }) => (
            <li className="mb-2 text-neutral-300 [&>code]:bg-neutral-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:text-emerald-400 [&>code]:font-mono">
              {children}
            </li>
          ),
          code: CodeBlock,
        }}
      >
        {output}
      </ReactMarkdown>
    </div>
  );
}
