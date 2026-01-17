import { getPost } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { BlogHeader } from "@/components/layout/BlogHeader";

import { Metadata } from "next";
import { SanityImage } from "@/types/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | iamalextorres`,
        description: post.excerpt || "Read this post on iamalextorres.com",
        openGraph: {
            images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-offwhite text-charcoal">
            {/* Header / Nav */}
            <BlogHeader />

            <main className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
                {/* Hero Image */}
                {post.mainImage && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Meta & Title */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-crimson-muted font-bold tracking-wider uppercase text-sm mb-4">
                        <Calendar size={16} />
                        <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{post.title}</h1>
                </div>

                {/* Rich Text Content */}
                <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-p:leading-relaxed prose-a:text-crimson-muted hover:prose-a:text-crimson prose-img:rounded-xl">
                    <PortableText
                        value={post.body}
                        components={{
                            block: {
                                normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
                                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                                blockquote: ({ children }) => <blockquote className="border-l-4 border-crimson-muted pl-4 italic my-6">{children}</blockquote>,
                            },
                            types: {
                                image: ({ value }: { value: SanityImage }) => (
                                    <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden">
                                        <Image
                                            src={urlFor(value).width(800).url()}
                                            alt={value.alt || 'Blog Image'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ),
                            }
                        }}
                    />
                </article>
            </main>


        </div>
    );
}
