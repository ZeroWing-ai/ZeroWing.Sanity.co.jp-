import { client } from './sanity.client';
import {
  allPostsQuery,
  categoriesQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  allTagsQuery,
  popularPostsQuery,
} from './queries';

export async function getAllPosts() {
  return await client.fetch(allPostsQuery);
}

export async function getPostsByCategory(categoryId: string) {
  return await client.fetch(postsByCategoryQuery, { categoryId });
}

export async function getPostsByTag(tag: string) {
  return await client.fetch(postsByTagQuery, { tag });
}

export async function getAllCategories() {
  return await client.fetch(categoriesQuery);
}

export async function getAllTags() {
  const result = await client.fetch(allTagsQuery);
  return result.tags || [];
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(postBySlugQuery, { slug });
}

export async function getRelatedPosts(categoryIds: string[], currentPostId: string) {
  return await client.fetch(
    `*[_type == "post" && count((categories[]._ref)[@ in $categoryIds]) > 0 && _id != $currentPostId] | order(publishedAt desc, _createdAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt,
      "category": categories[0]->{title, slug, color}
    }`,
    { categoryIds, currentPostId }
  );
}

export async function getPopularPosts() {
  return await client.fetch(popularPostsQuery);
}
