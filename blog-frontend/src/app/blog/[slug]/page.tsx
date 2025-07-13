import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getRelatedPosts } from '@/sanity/lib/api';
import CategoryBadge from '@/components/CategoryBadge';
import BlogPostList from '@/components/BlogPostList';
import Tag from '@/components/Tag';
import { Metadata } from 'next';

export async function generateStaticParams() {
  // This would be populated with all post slugs at build time
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.mainImage?.asset?.url || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || ''],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories?.map((cat: any) => cat._id) || [];
  const relatedPosts = await getRelatedPosts(categoryIds, post._id);

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {post.categories?.map((category) => (
              <CategoryBadge
                key={category._id}
                title={category.title}
                slug={category.slug.current || category.slug}
                color={category.color}
              />
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center">
              {post.author?.image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={`${post.author.image.asset.url}?w=80&h=80&fit=crop`}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {post.author?.name}
                </div>
                <time 
                  dateTime={post.publishedAt}
                  className="text-sm"
                >
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 ml-auto">
                {post.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>
          
          {post.mainImage && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={`${post.mainImage.asset.url}?w=1200&h=600&fit=crop`}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
        </header>
        
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <PortableText
            value={post.body}
            components={{
              // Add any custom components for PortableText here
              types: {
                image: ({ value }) => (
                  <div className="my-8">
                    <Image
                      src={`${value.asset.url}?w=1200`}
                      alt={value.alt || 'Blog post image'}
                      width={1200}
                      height={Math.round((9 / 16) * 1200)}
                      className="rounded-lg"
                    />
                    {value.caption && (
                      <figcaption className="text-center text-sm text-gray-500 mt-2">
                        {value.caption}
                      </figcaption>
                    )}
                  </div>
                ),
              },
            }}
          />
        </div>
        
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {post.tags?.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {format(new Date(post._updatedAt || post.publishedAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </footer>
      </article>
      
      {relatedPosts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <BlogPostList 
            posts={relatedPosts} 
            showCategory={true}
            showTags={false}
            showExcerpt={false}
          />
        </section>
      )}
    </div>
  );
}
