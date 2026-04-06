import {defineField, defineType} from 'sanity'
import {MdViewHeadline as icon} from 'react-icons/md'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'url',
    }),
    defineField({
      name: 'align',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'Hero Section',
        media: media || icon,
      }
    },
  },
})