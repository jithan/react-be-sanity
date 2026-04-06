import {defineField, defineType, defineArrayMember} from 'sanity'
import {MdViewCarousel as icon} from 'react-icons/md'

export default defineType({
  name: 'ctaCardPanel',
  title: 'CTA Card Panel',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'componentId',
      title: 'Component ID',
      type: 'string',
      description: 'Optional anchor/id value to set on the section.',
    }),
    defineField({
      name: 'colorVariant',
      title: 'Color variant',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Grey', value: 'grey'},
          {title: 'Primary', value: 'primary'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow text',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'url', title: 'URL', type: 'url'}),
        defineField({
          name: 'target',
          title: 'Target',
          type: 'string',
          options: {
            list: [
              {title: 'Same tab', value: '_self'},
              {title: 'New tab', value: '_blank'},
            ],
          },
          initialValue: '_self',
        }),
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ctaCard',
          title: 'Card',
          fields: [
            defineField({name: 'title', title: 'Card Title', type: 'string'}),
            defineField({name: 'description', title: 'Card Description', type: 'text'}),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'link',
              title: 'Card Link',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({name: 'url', title: 'URL', type: 'url'}),
                defineField({
                  name: 'target',
                  title: 'Target',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Same tab', value: '_self'},
                      {title: 'New tab', value: '_blank'},
                    ],
                  },
                  initialValue: '_self',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow',
      media: 'cards.0.image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'CTA Card Panel',
        subtitle: subtitle ? `${subtitle}` : 'CTA card panel section',
        media,
      }
    },
  },
})
