
export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
}

export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: SanityImage;
    description: string;
    tags: string[];
    repo: string;
    link: string;
}

import { PortableTextBlock } from "sanity";

export interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: SanityImage;
    publishedAt: string;
    excerpt: string;
    body: PortableTextBlock[]; // Portable Text block content
}

export interface Game {
    _id: string;
    title: string;
    platform: string;
    status: "Playing" | "Finished" | "Want";
    coverImage: SanityImage;
}

export interface Trip {
    _id: string;
    location: string;
    geopoint: { lat: number; lng: number };
    visitDate: string;
    description: string;
    photos: SanityImage[];
}

export interface WishlistItem {
    _id: string;
    name: string;
    price: string;
    link: string;
    image: SanityImage;
    priority: number;
}

export interface Profile {
    _id: string;
    fullName: string;
    headline: string;
    bio: string;
    profileImage: SanityImage;
    email: string;
    location: string;
    resume: string; // URL to the file
    socialLinks: {
        platform: string;
        url: string;
    }[];
}
