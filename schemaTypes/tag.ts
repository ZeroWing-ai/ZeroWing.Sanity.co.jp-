import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'タグ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'タグ名',
      type: 'string',
      description: 'タグの名前を入力してください（2〜30文字）',
      validation: Rule => Rule.required().min(2).max(30).error('2文字以上30文字以下で入力してください'),
    }),
    defineField({
      name: 'slug',
      title: 'URLスラッグ',
      type: 'slug',
      description: 'URLに使用される文字列です。日本語の場合は自動的にローマ字に変換されます',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('URLスラッグを入力してください'),
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'タグの説明を入力してください（任意、最大200文字）',
      validation: Rule => Rule.max(200).error('200文字以下で入力してください'),
    }),
    defineField({
      name: 'color',
      title: '色',
      type: 'string',
      description: 'タグの表示色を選択してください',
      options: {
        list: [
          { title: '青', value: 'blue' },
          { title: '緑', value: 'green' },
          { title: '赤', value: 'red' },
          { title: '黄', value: 'yellow' },
          { title: '紫', value: 'purple' },
          { title: 'ピンク', value: 'pink' },
          { title: 'グレー', value: 'gray' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
  },
})
