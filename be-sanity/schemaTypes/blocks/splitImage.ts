import {defineField, defineType} from 'sanity'
import {MdImage as icon} from 'react-icons/md'

export default defineType({
  name: 'splitImage',
  title: 'Split Image Section',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
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
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      imagePosition: 'imagePosition',
    },
    prepare(selection) {
      const { title, image, imagePosition } = selection
      return {
        title: title || 'Split Image Section',
        subtitle: `Image ${imagePosition || 'right'}`,
        media: image || icon,
      }
    },
  },
})