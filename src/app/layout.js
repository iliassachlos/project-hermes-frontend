'use client'
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Header from "@/app/components/shared/header";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeSwitcher} from "@/app/components/shared/theme-switcher";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({children}) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <Header/>
                <ThemeSwitcher/>
                {children}
            </NextThemesProvider>
        </NextUIProvider>
        </body>
        </html>
    );
}
