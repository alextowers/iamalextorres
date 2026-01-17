"use client";

import { useLanguage } from "./LanguageContext";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-crimson-muted text-white shadow-md' : 'text-white/50 hover:text-white'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'es' ? 'bg-crimson-muted text-white shadow-md' : 'text-white/50 hover:text-white'
                    }`}
            >
                ES
            </button>
        </div>
    );
}
