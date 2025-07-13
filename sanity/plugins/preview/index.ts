import { StructureBuilder } from 'sanity/desk'
import { previewDocumentNode } from './PreviewAction'

export const previewPlugin = (S: StructureBuilder, options: { types: string[] }) => {
  return S.document().views([
    S.view.form(),
    ...options.types.map(type => 
      S.view
        .component(({ document }) => (
          <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white',
            }}
            src={`/api/preview?secret=${process.env.SANITY_PREVIEW_SECRET}&slug=${document.displayed?.slug?.current}&type=${type}`}
          />
        ))
        .title(`Preview ${type}`)
    )
  ])
}
