"use client";

import { useLanguage } from "./LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Footer() {
    const { language } = useLanguage();

    return (
        <footer className="bg-charcoal-dark py-12 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-white/40 text-sm">
                    &copy; {new Date().getFullYear()} Alejandro Torres Rodriguez. {TRANSLATIONS[language].footer.rights}
                </p>
                <p className="text-white/20 text-xs mt-2">
                    {TRANSLATIONS[language].footer.builtWith}
                </p>
            </div>
        </footer>
    );
}
