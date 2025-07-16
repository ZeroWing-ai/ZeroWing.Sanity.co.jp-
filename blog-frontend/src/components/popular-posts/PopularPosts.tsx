'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';

interface PopularPostsProps {
  initialPosts?: Post[];
}

export default function PopularPosts({ initialPosts = [] }: PopularPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(!initialPosts?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      if (initialPosts?.length) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/popular-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch popular posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching popular posts:', err);
        setError('Failed to load popular posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPosts();
  }, [initialPosts]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
        <p className="text-gray-500 dark:text-gray-400">人気記事はまだありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
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
              href={`/blog/${post.slug?.current || ''}`}
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
