"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownComponent() {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch("/posts/post1.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <section>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </section>
  );
}

export default MarkdownComponent;
