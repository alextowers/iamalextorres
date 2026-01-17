"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, FileText, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Profile } from "@/types/sanity";

import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Contact() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { language } = useLanguage();

    useEffect(() => {
        getProfile(language).then(setProfile);
    }, [language]);

    return (
        <section id="contact" className="py-24 bg-charcoal text-white relative overflow-hidden scroll-mt-28">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-crimson-muted/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left: Heading & Info */}
                    <div>
                        <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-4">{TRANSLATIONS[language].contact.subtitle}</h2>
                        <h3 className="text-5xl font-bold mb-8 leading-tight whitespace-pre-line">{TRANSLATIONS[language].contact.title}</h3>
                        <p className="text-white/60 text-lg mb-12 max-w-md">
                            {profile?.headline === 'Available for hire'
                                ? TRANSLATIONS[language].contact.descAvailable
                                : TRANSLATIONS[language].contact.descBusy}
                        </p>

                        <div className="space-y-6">
                            {profile?.email && (
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                                    <div className="p-3 bg-crimson-muted/20 text-crimson-muted rounded-full group-hover:bg-crimson-muted group-hover:text-white transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/40">{TRANSLATIONS[language].contact.emailLabel}</p>
                                        <p className="text-xl font-medium">{profile.email}</p>
                                    </div>
                                </a>
                            )}

                            {profile?.location && (
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-transparent opacity-80">
                                    <MapPin className="text-white/40" size={20} />
                                    <span className="text-white/80">{profile.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Social Grids & Image */}
                    <div className="bg-charcoal-light rounded-2xl p-8 border border-white/5">
                        <div className="flex items-center gap-6 mb-8">
                            {profile?.profileImage && (
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                                    <Image src={urlFor(profile.profileImage).width(100).url()} alt="Avatar" fill className="object-cover" />
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-xl">{profile?.fullName}</h4>
                                <p className="text-sm text-white/50">{profile?.headline}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {profile?.resume && (
                                <a href={`${profile.resume}?dl=${profile.fullName.replace(/\s+/g, '_')}_Resume.pdf`} className="flex items-center justify-between w-full p-4 bg-white text-charcoal font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                    <span className="flex items-center gap-2"><FileText size={20} /> {TRANSLATIONS[language].contact.resumeBtn}</span>
                                    <ArrowUpRight size={20} />
                                </a>
                            )}

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {profile?.socialLinks?.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-black/20 rounded-lg hover:bg-black/40 transition-colors border border-white/5 flex flex-col items-center justify-center gap-2 text-center group"
                                    >
                                        <span className="font-medium group-hover:text-crimson-muted transition-colors">{social.platform}</span>
                                        <span className="text-xs text-white/30 hidden group-hover:block transition-all">Visit Profile</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
