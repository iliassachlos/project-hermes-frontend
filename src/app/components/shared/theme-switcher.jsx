'use client'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (theme !== systemTheme) {
            setTheme(systemTheme);
        }
    }, [theme, setTheme]);

    if (!mounted) return null;

    return null;
}
