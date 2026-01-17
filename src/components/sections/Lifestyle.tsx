"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts, getGames } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Post, Game } from "@/types/sanity";
import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Lifestyle() {
    const [posts, setPosts] = useState<Post[]>([]);
    const { language } = useLanguage();
    const [games, setGames] = useState<Game[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoaded(false);
        Promise.all([getPosts(language), getGames()]).then(([postsData, gamesData]) => {
            if (isMounted) {
                setPosts(postsData);
                setGames(gamesData);
                setIsLoaded(true);
            }
        });
        return () => { isMounted = false; };
    }, [language]);

    return (
        <section id="blog" className="py-24 bg-white text-charcoal relative overflow-hidden scroll-mt-28 min-h-[800px]">
            {/* Ambient Background (Subtle for light mode) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-crimson-muted/15 rounded-full blur-3xl mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Blog Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-2">{TRANSLATIONS[language].lifestyle.subtitle}</h2>
                    <h3 className="text-4xl font-bold mb-8">{TRANSLATIONS[language].lifestyle.title}</h3>

                    <AnimatePresence mode="wait">
                        {isLoaded && (
                            <motion.div
                                key={`blog-${language}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid md:grid-cols-2 gap-12"
                            >
                                {posts.map((post) => (
                                    <Link href={`/blog/${post.slug.current}`} key={post._id} className="group cursor-pointer block">
                                        <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                                            {post.mainImage && (
                                                <Image
                                                    src={urlFor(post.mainImage).url()}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, 600px"
                                                />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-crimson-muted font-medium mb-2">
                                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>Blog</span>
                                        </div>
                                        <h4 className="text-2xl font-bold group-hover:text-crimson transition-colors">{post.title}</h4>
                                        <p className="text-gray-600 mt-2">{post.excerpt}</p>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Gaming & Spotify Grid */}
                <div className="grid lg:grid-cols-2 gap-16 md:gap-8 mt-24">

                    {/* Gaming */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-crimson-muted">{'///'}</span> Gaming Status
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {games.map((game) => (
                                <div key={game._id} className="flex-none w-36 snap-center">
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                                        {game.coverImage && (
                                            <Image
                                                src={urlFor(game.coverImage).url()}
                                                alt={game.title}
                                                fill
                                                className="object-cover"
                                                sizes="150px"
                                            />
                                        )}
                                    </div>
                                    <p className="font-bold text-sm truncate">{game.title}</p>
                                    <p className="text-xs text-gray-500">{game.platform}</p>
                                    <span className={
                                        `text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 uppercase font-bold
                                ${game.status === 'Playing' ? 'bg-crimson-muted text-white' : 'bg-gray-200 text-gray-600'}`
                                    }>
                                        {TRANSLATIONS[language].lifestyle.gameStatus[game.status as keyof typeof TRANSLATIONS.en.lifestyle.gameStatus] || game.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Spotify */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-crimson-muted">{'///'}</span> On Repeat
                        </h3>
                        <div className="bg-charcoal text-white rounded-xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
                            {/* Spotify Embed Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-black/80 z-0" />
                            <div className="z-10 text-center">
                                <p className="font-bold text-xl mb-2">{TRANSLATIONS[language].lifestyle.spotifyTitle}</p>
                                <p className="text-white/60 text-sm">{TRANSLATIONS[language].lifestyle.spotifyDesc}</p>
                                <button className="mt-4 px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-colors text-sm">
                                    {TRANSLATIONS[language].lifestyle.listen}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
