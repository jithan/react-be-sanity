import {defineField, defineType} from 'sanity'
import {MdViewHeadline as icon} from 'react-icons/md'

export default defineType({
  name: 'spotlight',
  title: 'Spotlight Section',
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
      name: 'spotlightImage',
      title: 'Spotlight Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'Spotlight Image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Spotlight Section',
        subtitle: subtitle || 'Spotlight Section',
        media: media || icon,
      }
    },
  },
})