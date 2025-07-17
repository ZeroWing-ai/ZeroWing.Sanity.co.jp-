import { createClient } from '@sanity/client';
import { Post } from '@/types/post';
import PopularPostsClient from './PopularPosts.client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PopularPosts() {
  try {
    const query = `*[_type == "post"] | order(viewCount desc) [0...5] {
      _id,
      title,
      viewCount,
      "slug": slug.current,
      publishedAt
    }`;

    const posts: Post[] = await client.fetch(query);
    return <PopularPostsClient initialPosts={posts} />;
  } catch (error) {
    console.error('Error in PopularPosts server component:', error);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">人気記事ランキング</h2>
        <p className="text-red-500 dark:text-red-400">記事の読み込み中にエラーが発生しました</p>
      </div>
    );
  }
}
