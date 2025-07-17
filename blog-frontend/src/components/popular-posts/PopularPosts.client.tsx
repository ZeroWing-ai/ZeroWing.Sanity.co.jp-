'use client';

import Link from 'next/link';
import { Post } from '@/types/post';

interface PopularPostsClientProps {
  initialPosts: Post[];
}

export default function PopularPostsClient({ initialPosts }: PopularPostsClientProps) {
  if (!initialPosts?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
        <p className="text-gray-500 dark:text-gray-400">表示する記事がありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
      <div className="space-y-4">
        {initialPosts.map((post, index) => (
          <div key={post._id} className="flex items-start group">
            <span 
              className={`text-2xl font-bold w-8 flex-shrink-0 ${
                index < 3 ? 'text-yellow-500' : 'text-gray-400'
              }`}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
              title={post.title}
              prefetch={false}
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
