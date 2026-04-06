import {defineField, defineType} from 'sanity'
import {MdViewModule as icon} from 'react-icons/md'

export default defineType({
  name: 'features',
  title: 'Features Section',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name or emoji',
            }),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare(selection) {
              const { title, media } = selection
              return {
                title: title || 'Feature',
                media: media,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      features: 'features',
    },
    prepare(selection) {
      const { title, features } = selection
      return {
        title: title || 'Features Section',
        subtitle: `Features Section (${features?.length || 0} features)`,
        media: icon,
      }
    },
  },
})