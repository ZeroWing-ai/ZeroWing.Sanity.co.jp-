import Link from 'next/link';
import { Post } from '@/types/post';

interface PopularPostsProps {
  posts: Post[];
}

export default function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post._id} className="flex items-start group">
            <span className={`text-2xl font-bold w-8 flex-shrink-0 ${
              index < 3 ? 'text-yellow-500' : 'text-gray-400'
            }`}>
              {index + 1}
            </span>
            <Link 
              href={`/blog/${post.slug.current}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
              title={post.title}
            >
              {post.title}
              {post.viewCount && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({post.viewCount} views)
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
