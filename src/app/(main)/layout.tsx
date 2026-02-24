import { StarsBackground } from "@/src/components/animate-ui/components/backgrounds/stars";
import Navbar from "@/src/components/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full relative">
      <Navbar />
      <div className="absolute inset-0 flex items-center justify-center">
        <StarsBackground />
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
