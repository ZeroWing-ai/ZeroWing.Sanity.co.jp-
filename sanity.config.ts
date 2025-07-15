import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {previewDocumentNode} from './plugins/preview/PreviewAction'
import {PopularPostsWidget} from './widgets/PopularPostsWidget'

export default defineConfig({
  name: 'default',
  title: 'ブログ管理画面',

  projectId: '56s7n4hs',
  dataset: 'production',

  plugins: [
    structureTool({
      title: 'コンテンツ管理',
      defaultDocumentNode: undefined,
    }),
    visionTool({
      title: 'クエリエクスプローラー',
    }),
    PopularPostsWidget({
      title: '人気記事ランキング',
      width: 'medium'
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // i18n設定は現在のバージョンでは別の方法で行う必要があります
  // 以下のようにlocaleを設定します
  // 注意: 完全なi18nサポートには追加の設定が必要です

  // ドキュメント設定
  document: {
    // 新規ドキュメント作成時のデフォルト設定
    productionUrl: async (prev, context) => {
      // 本番環境のURLを設定
      const { getClient } = context
      const client = getClient({ apiVersion: '2023-05-03' })
      
      // ドキュメントのタイプに応じたURLを返す
      if (context.document._type === 'post' && 'slug' in context.document) {
        const slug = context.document.slug as { current?: string }
        if (slug?.current) {
          return `https://your-site.com/blog/${slug.current}`
        }
      }
      return prev
    },
  },
})
