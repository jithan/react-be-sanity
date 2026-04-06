import {defineType, defineField} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export default defineType({
  name: 'HTMLBlock',
  title: 'HTML',
  type: 'object',
  icon: CodeBlockIcon,

  fields: [
    defineField({
      name: 'field_component_id',
      title: 'Component ID',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'data_id_for_anchor_linking',
      title: 'Data ID for anchor linking',
      type: 'string',
      description: 'DOM id (no #). Used as the section id for in‑page anchors.',
      validation: (Rule) =>
        Rule.regex(/^[A-Za-z][-A-Za-z0-9_:.]*$/).error(
          'Must be a valid HTML id: start with a letter; allow letters, digits, hyphens, underscores, colons, periods.'
        ),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.max(180),
    }),

    // Matches the "Text format" dropdown in Drupal
    defineField({
      name: 'text_format',
      title: 'Text format',
      type: 'string',
      options: {
        list: [
          {title: 'Rich Text', value: 'richText'},
          {title: 'Raw HTML', value: 'rawHtml'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'richText',
      validation: (Rule) => Rule.required(),
    }),

    // Rich text (Portable Text)
    defineField({
      name: 'description_rich',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          // (Optional) customize styles, lists, marks as needed
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {name: 'href', title: 'URL', type: 'url'},
                  {name: 'openInNewTab', title: 'Open in new tab', type: 'boolean'},
                ],
              },
            ],
          },
        },
      ],
      // Show only if text_format === 'richText'
      hidden: ({parent}) => parent?.text_format !== 'richText',
    }),

    // Raw HTML alternative (only if you choose Raw HTML)
    defineField({
      name: 'description_html',
      title: 'Description (Raw HTML)',
      type: 'text',
      rows: 8,
      description: 'Paste HTML. Render carefully on the frontend.',
      hidden: ({parent}) => parent?.text_format !== 'rawHtml',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          // If rawHtml is selected, require some content
          if (ctx.parent?.text_format === 'rawHtml' && !val) {
            return 'HTML is required when Text format is Raw HTML.'
          }
          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      fmt: 'text_format',
    },
    prepare({title, fmt}) {
      return {
        title: title || 'HTML',
        subtitle: fmt === 'rawHtml' ? 'Raw HTML' : 'Rich Text',
      }
    },
  },
})