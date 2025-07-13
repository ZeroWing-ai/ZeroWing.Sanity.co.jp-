import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/sanity/lib/api';
import BlogPostList from '@/components/BlogPostList';
import Tag from '@/components/Tag';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const { tags } = await getAllTags();
  return tags.map((tag: string) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  
  return {
    title: `#${decodedTag} - Blog Posts`,
    description: `Browse all blog posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);
  const allTags = await getAllTags();
  
  // Check if the tag exists
  const tagExists = allTags.tags.includes(decodedTag);
  
  if (!tagExists) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <span className="mr-3">Tag:</span>
          <Tag tag={decodedTag} className="text-2xl" />
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{decodedTag}"
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <BlogPostList posts={posts} />
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                No posts found with this tag
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
