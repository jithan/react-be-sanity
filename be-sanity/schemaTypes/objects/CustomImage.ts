// schemas/objects/CustomImage.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'CustomImage',
  title: 'Image',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
  ],
})