// schemas/Anchor_links.ts
import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'Anchor_links',          // ← schema name (no spaces)
  title: 'Anchor links',         // ← label shown in Studio
  type: 'object',
  icon: LinkIcon,

  fields: [
    defineField({
      name: 'items',
      title: 'Anchor links tab items',
      type: 'array',
      of: [
        defineField({
          name: 'anchorItem',
          title: 'Anchor links tab item',
          type: 'object',
          fields: [
            defineField({
              name: 'linkText',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) =>
                Rule.required().min(1).max(160),
            }),
            defineField({
              name: 'componentId',
              title: 'Component ID',
              type: 'string',
              description:
                'Enter the ID of the component including # (e.g., #faq-content).',
              validation: (Rule) =>
                Rule.required()
                  .regex(/^#[A-Za-z][-A-Za-z0-9_:.]*$/, {
                    name: 'hash-id',
                    invert: false,
                  })
                  .error(
                    'Must start with # and follow HTML id rules: start with a letter; allow letters, digits, hyphens, underscores, colons, periods.'
                  ),
            }),
          ],
          preview: {
            select: {title: 'linkText', id: 'componentId'},
            prepare({title, id}) {
              return {
                title: title || 'Anchor link',
                subtitle: id,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
      options: {
        // enables drag-and-drop reordering in Studio
        sortable: true,
      },
    }),
  ],

  preview: {
    select: {items: 'items'},
    prepare({items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Anchor links',
        subtitle: `${count} tab item${count === 1 ? '' : 's'}`,
      }
    },
  },
})