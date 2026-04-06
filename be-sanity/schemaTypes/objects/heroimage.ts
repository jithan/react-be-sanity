// schemas/Heroimage.ts
import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'Heroimage',
  title: 'Hero Image',
  type: 'object',
  icon: ImageIcon,

  fields: [
    // Component ID — Text (plain)
    defineField({
      name: 'field_component_id',
      title: 'Component ID',
      type: 'string',
      description: 'Unique component identifier.',
      validation: (Rule) => Rule.required().max(120),
    }),

    // Title — Text (plain)
    defineField({
      name: 'field_component_title',
      title: 'Title',
      type: 'string',
      description: 'Hero title.',
      validation: (Rule) => Rule.required().max(180),
    }),

    // Eyebrow — Text (plain)
    defineField({
      name: 'field_component_title_eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short eyebrow/overline text.',
      validation: (Rule) => Rule.max(120),
    }),

    // Data ID for anchor linking — Text (plain)
    defineField({
      name: 'data_id_for_anchor_linking',
      title: 'Data ID for anchor linking',
      type: 'string',
      description: 'Optional DOM anchor id (no spaces).',
      validation: (Rule) =>
        Rule.regex(/^[A-Za-z][-A-Za-z0-9_:.]*$/).error(
          'Must be a valid HTML id: start with a letter; letters, digits, hyphens, underscores, colons, periods allowed.'
        ),
    }),

    // Description — Text (formatted, long) -> Portable Text
    defineField({
      name: 'field_component_description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich description text.',
      validation: (Rule) => Rule.required(),
    }),

    // CTA — Link
    defineField({
      name: 'field_link',
      title: 'CTA',
      type: 'link',
    }),

    // Image Alignment — List (text)
    defineField({
      name: 'field_component_list_image_alignment',
      title: 'Image Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      validation: (Rule) => Rule.required(),
    }),

    // Image field — main hero image
    defineField({
      name: 'image_field',
      title: 'Image field',
      type: 'image',
      description: 'Main hero image.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for accessibility.',
          validation: (Rule) => Rule.required().min(5).max(160),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Logo/Service Pillar S — Media image
    defineField({
      name: 'logo_service_pillar_sm',
      title: 'Logo/Service Pillar S',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),

  ],

  preview: {
    select: {
      title: 'field_component_title',
      media: 'image_field',
      eyebrow: 'field_component_title_eyebrow',
      id: 'field_component_id',
    },
    prepare({title, media, eyebrow, id}) {
      return {
        title: title || 'Hero Image',
        subtitle: [eyebrow, id].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})