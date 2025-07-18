import { groq } from 'next-sanity';
import { client } from './config';
import { Post, Category } from '@/types/post';

// 人気記事を取得するクエリ
export async function getPopularPosts(limit = 5): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(viewCount desc) [0...$limit] {
      _id,
      title,
      viewCount,
      "slug": slug.current,
      publishedAt
    }`,
    { limit }
  );
}

// すべての記事を取得するクエリ
export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

// すべてのカテゴリを取得するクエリ
export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  );
}

// スラッグから記事を取得するクエリ
export async function getPostBySlug(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      body,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}
