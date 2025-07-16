import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // use a recent API version
  useCdn: true,
  token: process.env.SANITY_API_TOKEN, // optional, for private datasets
});

export async function GET() {
  try {
    const query = `*[_type == "post"] | order(viewCount desc) [0...5] {
      _id,
      title,
      viewCount,
      "slug": slug.current,
      publishedAt
    }`;

    const posts = await client.fetch(query);
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch popular posts' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request
