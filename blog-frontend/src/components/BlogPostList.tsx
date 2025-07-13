import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import CategoryBadge from './CategoryBadge';
import Tag from './Tag';

interface Author {
  name: string;
  slug: string;
  image?: {
    asset: {
      url: string;
    };
  };
}

interface Category {
  _id: string;
  title: string;
  slug: string;
  color: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  publishedAt: string;
  categories: Category[];
  tags?: string[];
  author: Author;
}

interface BlogPostListProps {
  posts: BlogPost[];
  showCategory?: boolean;
  showTags?: boolean;
  showExcerpt?: boolean;
}

export default function BlogPostList({
  posts,
  showCategory = true,
  showTags = true,
  showExcerpt = true,
}: BlogPostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          No posts found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article
          key={post._id}
          className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {post.mainImage && (
            <div className="md:w-48 flex-shrink-0 relative h-48 md:h-36 rounded-lg overflow-hidden">
              <Image
                src={`${post.mainImage.asset.url}?w=400&h=300&fit=crop`}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <time 
                dateTime={post.publishedAt}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
              
              {showCategory && post.categories?.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <CategoryBadge
                    title={post.categories[0].title}
                    slug={post.categories[0].slug.current || post.categories[0].slug}
                    color={post.categories[0].color}
                  />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <Link href={`/blog/${post.slug.current || post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h2>
            
            {showExcerpt && post.excerpt && (
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {post.excerpt.length > 160
                  ? `${post.excerpt.substring(0, 160)}...`
                  : post.excerpt}
              </p>
            )}
            
            {showTags && post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
                {post.tags.length > 3 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            <div className="mt-4 flex items-center">
              {post.author?.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={`${post.author.image.asset.url}?w=64&h=64&fit=crop`}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {post.author?.name}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
