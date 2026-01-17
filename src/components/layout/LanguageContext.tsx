"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Initialize with default 'en' to match server-side rendering
    const [language, setLanguage] = useState<Language>('en');

    // Sync with localStorage after mount to avoid hydration mismatch
    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'en' || saved === 'es')) {
            // eslint-disable-next-line
            setLanguage(saved);
        }
    }, []);

    // Persist changes
    useEffect(() => {
        if (language) { // Guard against initial empty state if we ever change logic
            localStorage.setItem('language', language);
        }
    }, [language]);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        // Dispatch event for non-react listeners if needed, or simple force path reload if we switch strategies later.
        // For now, React state update will trigger re-fetches.
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
