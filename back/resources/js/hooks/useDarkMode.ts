import { useEffect, useState } from 'react';

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('ea/colorScheme') as 'light' | 'dark' | null;
            if (storedTheme) return storedTheme === 'dark';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark;
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const prefersDark = mediaQuery.matches;
            setIsDarkMode(prefersDark);
            localStorage.setItem('ea/colorScheme', prefersDark ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isDarkMode;
}
