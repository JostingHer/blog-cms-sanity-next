'use client'
import React from "react";
import { ThemeProvider } from "next-themes";



type ProviderThemeProps = {
    children: React.ReactNode;

}

const ProviderTheme = ({ children } : ProviderThemeProps ) => {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default ProviderTheme;
