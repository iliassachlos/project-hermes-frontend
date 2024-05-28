"use client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/shared/header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AuthProvider } from "@/context/auth-context";
import { PaginationProvider } from "@/context/pagination-context";

config.autoAddCss = false;

export default function RootLayout({ children }) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body>
            <NextUIProvider>
               <NextThemesProvider attribute="class" defaultTheme="dark">
                  <AuthProvider>
                     <Header />
                     <ThemeSwitcher />
                     <PaginationProvider>{children}</PaginationProvider>
                  </AuthProvider>
               </NextThemesProvider>
            </NextUIProvider>
         </body>
      </html>
   );
}
