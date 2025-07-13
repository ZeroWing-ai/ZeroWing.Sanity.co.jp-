import React from 'react'
import { EyeOpenIcon } from '@sanity/icons'
import { DefaultDocumentNodeResolver, StructureBuilder } from 'sanity/desk'

// TypeScript type for the document prop
interface DocumentPreviewProps {
  displayed: {
    slug: {
      current: string
    }
  }
}

// Preview component for the iframe
const Preview = ({ document }: { document: DocumentPreviewProps }) => {
  if (!document?.displayed?.slug?.current) {
    return (
      <div style={{ padding: '1rem' }}>
        <p>プレビューを表示するには、ドキュメントを保存して公開してください。</p>
      </div>
    )
  }

  const previewUrl = new URL(
    `/api/preview`,
    process.env.NODE_ENV === 'production'
      ? 'https://your-production-url.com'
      : 'http://localhost:3000'
  )
  
  previewUrl.searchParams.set('secret', process.env.SANITY_PREVIEW_SECRET || '') 
  previewUrl.searchParams.set('slug', document.displayed.slug.current)
  previewUrl.searchParams.set('type', 'post')

  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: 'white',
      }}
      src={previewUrl.toString()}
      title="プレビュー"
    />
  )
}

export const previewDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show the preview on documents that have a slug
  if (schemaType !== 'post') {
    return null
  }

  return S.document()
    .views([
      S.view.form(),
      S.view
        .component(Preview)
        .title('プレビュー')
        .icon(EyeOpenIcon)
    ])
}
