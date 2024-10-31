"use client"
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ProviderNextUi from './ProviderNextUi';

const ThemHomPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            {/* <ProviderNextUi> */}
            {children}
            {/* </ProviderNextUi> */}

        </ThemeProvider>
    );
};

export default ThemHomPage;