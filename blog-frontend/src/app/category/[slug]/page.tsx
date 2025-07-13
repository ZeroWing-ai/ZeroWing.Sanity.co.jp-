import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/sanity/lib/api';
import BlogPostList from '@/components/BlogPostList';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: any) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categories = await getAllCategories();
  const category = categories.find(
    (cat: any) => cat.slug.current === params.slug
  );

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} - Blog Posts`,
    description: `Browse all blog posts in the ${category.title} category`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPostsByCategory(params.slug);
  const categories = await getAllCategories();
  const currentCategory = categories.find(
    (cat: any) => cat.slug.current === params.slug
  );

  if (!currentCategory) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Category: {currentCategory.title}
        </h1>
        {currentCategory.description && (
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <BlogPostList posts={posts} />
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                No posts found in this category
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Check back later for new content!
              </p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <CategoriesList />
          <TagCloud />
        </div>
      </div>
    </div>
  );
}
