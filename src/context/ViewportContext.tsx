"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ViewportContextValue {
  isMobile: boolean;
}

const ViewportContext = createContext<ViewportContextValue>({ isMobile: false });

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  return useContext(ViewportContext);
}
