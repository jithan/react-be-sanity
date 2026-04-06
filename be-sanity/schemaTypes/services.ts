import {defineType, defineField} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: 'Services',
  title: 'Services',
  type: 'document',
  icon: DocumentsIcon,

  fields: [
    // 🌐 Language field
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Tamil', value: 'ta'},
          {title: 'Hindi', value: 'hi'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // 🔗 Link translations
    defineField({
      name: 'translationGroupId',
      title: 'Translation Group ID',
      type: 'string',
      description: 'Same ID for all language versions of this page',
      validation: (Rule) => Rule.required(),
    }),

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

    defineField({
      name: 'components',
      title: 'Page Components',
      type: 'array',
      of: [
        {type: 'Heroimage'},
        {type: 'Anchor_links'},
        {type: 'FullwidthImage'},
        {type: 'SpotlightContentService'},
        {type: 'TwoColumn'},
        {type: 'topicsSection'},
        {type: 'accordionGroup'},
        {type: 'searchBlock'},
      ],
      validation: (Rule) => Rule.required().min(1),
      options: {sortable: true},
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      lang: 'language',
    },
    prepare({title, subtitle, lang}) {
      return {
        title: `${title || 'Untitled'} (${lang || 'no-lang'})`,
        subtitle: subtitle ? `/${subtitle}` : 'No slug',
      }
    },
  },
})