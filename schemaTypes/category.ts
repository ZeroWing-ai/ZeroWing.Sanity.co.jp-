import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'カテゴリ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'カテゴリ名',
      type: 'string',
      description: 'カテゴリの名前を入力してください（2〜50文字）',
      validation: Rule => Rule.required().min(2).max(50).error('2文字以上50文字以下で入力してください'),
    }),
    defineField({
      name: 'slug',
      title: 'URLスラッグ',
      type: 'slug',
      description: 'URLに使用される文字列です。日本語の場合は自動的にローマ字に変換されます',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('URLスラッグを入力してください'),
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'カテゴリの説明を入力してください（20〜200文字）',
      validation: Rule => Rule.required().min(20).max(200).error('20文字以上200文字以下で入力してください'),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color for the category (used in the UI)',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Pink', value: 'pink' },
          { title: 'Orange', value: 'orange' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'blue',
    }),
  ],
  
  // Customize the preview in the Sanity Studio
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle || 'No description',
      }
    },
  },
})
