"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./animate-ui/components/buttons/button";

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(raw);
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

  const highlighted =
    language && hljs.getLanguage(language)
      ? hljs.highlight(raw, { language }).value
      : hljs.highlightAuto(raw).value;

  return (
    <pre className="bg-neutral-900 relative rounded-xl overflow-auto border border-neutral-800 my-4">
      <div className="sticky top-0 bg-neutral-800 flex items-center justify-between border-b border-neutral-800 px-4 py-2">
        <p className="text-xs text-neutral-300">{language}</p>
        <Button size="icon-sm" variant="ghost" onClick={copyToClipboard}>
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
      <code
        className={`hljs language-${language} block p-4 bg-neutral-900!`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
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
    <div className="w-[80%] mx-auto overflow-y-auto p-8 bg-neutral-950">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
