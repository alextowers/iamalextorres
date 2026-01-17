"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { useLanguage } from "./LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();

    const navItems = [
        { label: TRANSLATIONS[language].header.about, href: "/#about" },
        { label: TRANSLATIONS[language].header.projects, href: "/#projects" },
        { label: TRANSLATIONS[language].header.travel, href: "/#travel" },
        { label: TRANSLATIONS[language].header.blog, href: "/#blog" },
        { label: TRANSLATIONS[language].header.contact, href: "/#contact" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If we really are on the home page (pathname is exactly /)
        if (window.location.pathname === '/') {
            e.preventDefault();
            // Extract the ID from "/#id"
            const targetId = href.replace('/#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Optional: update URL without page reload/jump
                window.history.pushState(null, '', href);
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link
                    href="/"
                    onClick={(e) => {
                        if (window.location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                    className="flex items-center text-2xl font-bold tracking-tighter hover:text-crimson-muted transition-colors"
                >
                    iamalextorres<span className="text-crimson-muted">.com</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-sm font-medium text-white/80 hover:text-crimson-muted transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <LanguageSwitcher />
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-white/80 hover:text-white"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/10 p-6"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => {
                                        setIsOpen(false);
                                        handleNavClick(e, item.href);
                                    }}
                                    className="text-lg font-medium text-white/80 hover:text-crimson-muted transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 flex justify-start">
                                <LanguageSwitcher />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
