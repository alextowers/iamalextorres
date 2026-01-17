import { client } from "@/sanity/client";
import { type Project, type Post, type Game, type Trip, type WishlistItem, type Profile } from "@/types/sanity";

export async function getProfile(language: string = 'en'): Promise<Profile> {
  return client.fetch(`
    *[_type == "profile" && (language == $language || (!defined(language) && $language == "en"))][0] {
      _id, fullName, headline, bio, profileImage, email, location, "resume": resume.asset->url, socialLinks
    }
  `, { language });
}

export async function getProjects(language: string = 'en'): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project" && (language == $language || (!defined(language) && $language == "en"))] | order(date desc) {
      _id, title, description, tags, link, github, mainImage, date
    }
  `, { language });
}

export async function getPosts(language: string = 'en'): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && (language == $language || (!defined(language) && $language == "en"))] | order(publishedAt desc) {
      _id, title, slug, publishedAt, mainImage, "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
    }
  `, { language });
}

export async function getPost(slug: string): Promise<Post> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, mainImage, body
    }
  `, { slug });
}

export async function getGames(language: string = 'en'): Promise<Game[]> {
  return client.fetch(`
    *[_type == "game" && (language == $language || (!defined(language) && $language == "en"))] | order(_createdAt desc) {
      _id, title, platform, status, coverImage
    }
  `, { language });
}

export async function getTrips(language: string = 'en'): Promise<Trip[]> {
  return client.fetch(`
    *[_type == "trip" && (language == $language || (!defined(language) && $language == "en"))] | order(visitDate desc) {
      _id, location, visitDate, description, photos
    }
  `, { language });
}

export async function getWishlistItems(language: string = 'en'): Promise<WishlistItem[]> {
  return client.fetch(`
    *[_type == "wishlistItem" && (language == $language || (!defined(language) && $language == "en"))] | order(price asc) {
      _id, name, price, link, image, priority, category
    }
  `, { language });
}
