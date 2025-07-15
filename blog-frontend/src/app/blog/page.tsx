import { Metadata } from 'next';
import { getAllPosts, getAllCategories, getPopularPosts } from '@/sanity/lib/api';
import BlogPostList from '@/components/BlogPostList';
import CategoriesList from '@/components/CategoriesList';
import TagCloud from '@/components/TagCloud';
import PopularPosts from '@/components/PopularPosts';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles and updates',
};

export default async function BlogPage() {
  const [posts, categories, popularPosts] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getPopularPosts(),
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Latest articles, tutorials, and updates
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <CategoriesList categories={categories} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <TagCloud />
          </div>
          <PopularPosts posts={popularPosts} />
        </aside>

        <div className="lg:col-span-3">
          <BlogPostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
