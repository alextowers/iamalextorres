"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Profile } from "@/types/sanity";

import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Hero() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { language } = useLanguage();

    useEffect(() => {
        getProfile(language).then(setProfile);
    }, [language]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="about" className="min-h-screen flex items-center justify-center pt-0 bg-transparent text-white overflow-hidden relative z-10 scroll-mt-28">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson-muted/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-4">
                        {profile?.headline || 'Loading...'}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {profile?.fullName?.split(' ')[0] || 'Hello,'} <br />
                        <span className="text-white/80">{profile?.fullName?.split(' ').slice(1).join(' ') || 'World'}</span>
                    </h1>
                    <p className="text-xl text-white/60 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        {profile?.bio || 'Crafting digital experiences with passion and precision.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="px-8 py-4 bg-crimson-muted text-white font-bold rounded-full hover:bg-crimson transition-colors shadow-lg shadow-crimson-muted/20"
                        >
                            {TRANSLATIONS[language].hero.viewWork}
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            {TRANSLATIONS[language].hero.contactMe}
                        </button>
                    </div>
                </motion.div>

                {/* Image/Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 relative"
                >
                    <div className="relative w-72 h-72 md:w-[500px] md:h-[600px] mx-auto">
                        {/* Abstract frames border */}
                        <div className="absolute inset-4 border-2 border-white/20 z-20 translate-x-4 translate-y-4 rounded-3xl" />

                        <div className="absolute inset-0 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl z-10">
                            {/* Placeholder for Profile Image - Dynamic from Sanity */}
                            {profile?.profileImage ? (
                                <Image
                                    src={urlFor(profile.profileImage).width(800).height(1000).url()}
                                    alt={profile.fullName}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                    <span className="text-white/20 text-4xl font-bold">Photo</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
