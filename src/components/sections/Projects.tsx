"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/types/sanity";

import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Projects() {
    const { language } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoaded(false); // Reset for transition
        getProjects(language).then((data) => {
            if (isMounted) {
                setProjects(data);
                setIsLoaded(true);
            }
        });
        return () => { isMounted = false; };
    }, [language]);

    return (
        <section id="projects" className="py-24 bg-transparent text-white relative overflow-hidden z-10 scroll-mt-28 min-h-[600px]">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-2">{TRANSLATIONS[language].projects.subtitle}</h2>
                    <h3 className="text-4xl font-bold">{TRANSLATIONS[language].projects.title}</h3>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isLoaded && (
                        <motion.div
                            key={`projects-${language}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-charcoal-light rounded-xl overflow-hidden border border-white/5 hover:border-crimson-muted/50 transition-colors"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        {project.mainImage && (
                                            <Image
                                                src={urlFor(project.mainImage).url()}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            {project.repo && (
                                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-crimson-muted hover:text-white transition-colors"><Github size={20} /></a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-crimson-muted hover:text-white transition-colors"><ExternalLink size={20} /></a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h4 className="text-xl font-bold mb-2 group-hover:text-crimson-light transition-colors">{project.title}</h4>
                                        <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags?.map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-md text-white/50">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
