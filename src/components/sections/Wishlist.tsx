"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getWishlistItems } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { WishlistItem } from "@/types/sanity";

import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function Wishlist() {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const { language } = useLanguage();

    useEffect(() => {
        getWishlistItems(language).then(setItems);
    }, [language]);

    return (
        <section id="wishlist" className="py-24 bg-gray-50 text-charcoal relative overflow-hidden scroll-mt-28">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-gradient-to-tr from-crimson-muted/20 to-transparent rounded-full blur-3xl opacity-100" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-2">{TRANSLATIONS[language].wishlist.subtitle}</h2>
                    <h3 className="text-4xl font-bold">{TRANSLATIONS[language].wishlist.title}</h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                {item.image && (
                                    <Image src={urlFor(item.image).url()} alt={item.name} fill className="object-cover hover:scale-105 transition-transform" />
                                )}
                            </div>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-crimson-muted font-medium mb-4">{item.price}</p>
                            {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-charcoal text-white text-center rounded-lg hover:bg-black transition-colors text-sm font-medium">
                                    {TRANSLATIONS[language].wishlist.viewItem}
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
