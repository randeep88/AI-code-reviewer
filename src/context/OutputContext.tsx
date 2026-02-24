"use client";

import React, { createContext, useContext, useState } from "react";

const OutputContext = createContext<
  { output: string; setOutput: (output: string) => void } | undefined
>(undefined);

const OutputProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState("");
  return (
    <OutputContext.Provider value={{ output, setOutput }}>
      {children}
    </OutputContext.Provider>
  );
};

export const useOutput = () => {
  const context = useContext(OutputContext);
  if (!context) {
    throw new Error("useOutput must be used within an OutputProvider");
  }
  return context;
};

export default OutputProvider;
