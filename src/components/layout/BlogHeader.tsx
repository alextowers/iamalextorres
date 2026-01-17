"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function BlogHeader() {
    const { language } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-6 h-20 flex items-center">
                <Link href="/#blog" className="flex items-center gap-2 text-gray-500 hover:text-crimson-muted transition-colors font-medium">
                    <ArrowLeft size={20} />
                    {TRANSLATIONS[language].header.backToHome}
                </Link>
            </div>
        </header>
    );
}
