"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { getTrips } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Trip } from "@/types/sanity";

import { useLanguage } from "@/components/layout/LanguageContext";
import { TRANSLATIONS } from "@/constants/translations";

export function TravelMap() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const { language } = useLanguage();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setIsLoaded(false);
        getTrips(language).then((data) => {
            if (isMounted) {
                setTrips(data);
                setIsLoaded(true);
            }
        });
        return () => { isMounted = false; };
    }, [language]);

    return (
        <section id="travel" className="py-24 bg-offwhite text-charcoal scroll-mt-28 min-h-[800px]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-crimson-muted font-medium tracking-wide uppercase mb-2">{TRANSLATIONS[language].travel.subtitle}</h2>
                    <h3 className="text-4xl font-bold text-gray-900">{TRANSLATIONS[language].travel.title}</h3>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-4">
                        {TRANSLATIONS[language].travel.desc}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isLoaded && (
                        <motion.div
                            key={`trips-${language}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-24"
                        >
                            {trips.map((trip, index) => (
                                <motion.div
                                    key={trip._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start`}
                                >
                                    {/* Visual Side */}
                                    <div className="flex-1 w-full">
                                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl group">
                                            {/* Main Photo (Use first photo as cover) */}
                                            {trip.photos?.[0] ? (
                                                <Image
                                                    src={urlFor(trip.photos[0]).width(800).height(600).url()}
                                                    alt={trip.location}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 1024px) 100vw, 800px"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <MapPin size={48} className="text-gray-300" />
                                                </div>
                                            )}

                                            {/* Floating Badge */}
                                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                                                <MapPin size={16} className="text-crimson-muted" />
                                                {trip.location}
                                            </div>
                                        </div>

                                        {/* Mini Gallery (Next 3 photos) */}
                                        {trip.photos && trip.photos.length > 1 && (
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                {trip.photos.slice(1, 4).map((photo, i) => (
                                                    <div key={i} className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                                                        <Image
                                                            src={urlFor(photo).width(200).height(200).url()}
                                                            alt="Travel Detail"
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 33vw, 200px"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-1 space-y-6 lg:py-8">
                                        <div className="flex items-center gap-2 text-crimson-muted font-bold tracking-wider uppercase text-sm">
                                            <Calendar size={16} />
                                            <span>{new Date(trip.visitDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                        </div>

                                        <h4 className="text-4xl font-bold text-gray-900">{trip.location}</h4>

                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {trip.description || TRANSLATIONS[language].travel.noDescription}
                                        </p>

                                        <div className="pt-6 border-t border-gray-200">
                                            <div className="flex gap-4">
                                                <div className="text-center">
                                                    <span className="block text-2xl font-bold">{trip.photos?.length || 0}</span>
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{TRANSLATIONS[language].travel.photos}</span>
                                                </div>
                                                {/* Placeholder for future stats like 'Days', 'Miles', etc. */}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {trips.length === 0 && (
                                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400">No trips added yet. Start your journey!</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
}
