import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'The full name of the author',
      validation: Rule => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the URL',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Author\'s role or position',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      description: 'A clear headshot of the author',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility',
          validation: Rule => Rule.required(),
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      description: 'A short bio about the author',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
          description: 'Full URL to Twitter profile',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'Full URL to GitHub profile',
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url',
          description: 'Author\'s personal website or blog',
        },
      ],
    }),
  ],
  
  // Customize the preview in the Sanity Studio
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
