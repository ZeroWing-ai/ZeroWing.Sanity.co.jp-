import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'ブログ記事',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      description: '記事のタイトルを入力してください（5〜100文字）',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URLスラッグ',
      type: 'slug',
      description: '記事のURLに使用される文字列です。日本語の場合は自動的にローマ字に変換されます。',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      description: '記事の短い要約を入力してください（50〜200文字）',
      validation: Rule => Rule.required().min(50).max(200),
    }),
    defineField({
      name: 'author',
      title: '著者',
      type: 'reference',
      to: {type: 'author'},
      description: '記事の著者を選択してください',
      validation: Rule => Rule.required().error('著者を選択してください'),
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      description: '記事のメイン画像をアップロードしてください',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '代替テキスト',
          description: '画像の説明文を入力してください（SEOとアクセシビリティのため）',
          validation: Rule => Rule.required().error('代替テキストを入力してください'),
        }
      ],
      validation: Rule => Rule.required().error('メイン画像をアップロードしてください'),
    }),
    defineField({
      name: 'categories',
      title: 'カテゴリ',
      type: 'array',
      description: '記事のカテゴリを1〜3つ選択してください',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: Rule => Rule.required().min(1).error('少なくとも1つのカテゴリを選択してください').max(3),
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      description: '記事に関連するタグを選択してください',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
          options: {
            filter: '!(_id in path("drafts.**"))', // ドラフトを除外
          },
        },
      ],
      validation: Rule => Rule.unique().max(10).error('タグは最大10個まで選択できます'),
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日時',
      type: 'datetime',
      description: '記事を公開する日時を設定してください（未設定の場合は現在日時が使用されます）',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required().error('公開日時を入力してください'),
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContent',
      description: '記事の本文を入力してください',
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
