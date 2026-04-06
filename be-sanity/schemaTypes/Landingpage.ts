// schemas/Landingpage.ts
import {defineType, defineField} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: 'Landingpage',
  title: 'Landingpage',
  type: 'document',
  icon: DocumentsIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    // Optional: author / date fields
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),

    // Components zone 
    defineField({
      name: 'components',
      title: 'Page Components',
      type: 'array',
      of: [
        {type: 'Heroimage'},     // <-- your existing schema
        {type: 'Anchor_links'},  // <-- your existing schema
        {type: 'FullwidthImage'}, // <-- new component
        {type: 'SpotlightContentService'}, // <-- new component
        {type: 'TwoColumn'}, // <-- new component

        // Add future components here (e.g. RichTextBlock, Quote, Gallery, etc.)
      ],
      validation: (Rule) => Rule.required().min(1),
      options: {sortable: true},
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Landingpage',
        subtitle: subtitle ? `/${subtitle}` : 'No slug',
      }
    },
  },
})