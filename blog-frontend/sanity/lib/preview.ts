import { createClient } from 'next-sanity'
import { previewClient } from './sanity.client'

export const getPreviewPost = async (slug: string) => {
  const post = await previewClient.fetch(
    `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0]`,
    { slug }
  )
  return post
}

export const getClient = (preview: boolean) => 
  preview ? previewClient : createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
    useCdn: false,
  })
