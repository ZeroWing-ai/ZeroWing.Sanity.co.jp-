import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'post'

  // Check the secret and next parameters
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid token', { status: 401 })
  }

  if (!slug) {
    return new NextResponse('Slug is required', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  let url = `/${type}s/${slug}`
  
  // For drafts, we'll add a preview query parameter to the URL
  const searchParamsString = new URLSearchParams()
  searchParamsString.set('preview', 'true')
  
  url = `${url}?${searchParamsString.toString()}`

  return NextResponse.redirect(new URL(url, request.url))
}
