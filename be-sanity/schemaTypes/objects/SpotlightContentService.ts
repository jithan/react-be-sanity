// schemas/objects/SpotlightContentService.ts
import {defineType, defineField} from 'sanity'
import {SparkleIcon} from '@sanity/icons'

export default defineType({
  name: 'SpotlightContentService',
  title: 'Spotlight content & Service',
  type: 'object',
  icon: SparkleIcon,

  fields: [
    // Spotlight content (required)
    defineField({
      name: 'spotlight_content',
      title: 'Spotlight content',
      type: 'string',
      options: {
        list: [
          {title: 'Service', value: 'service'},
          {title: 'Content', value: 'content'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'service',
    }),

    // Component ID — Text (plain)
    defineField({
      name: 'field_component_id',
      title: 'Component ID',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),

    // Data ID for anchor linking — HTML id (no #)
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

    // Title — Text (plain)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.max(180),
    }),

    // Background Color
    defineField({
      name: 'background_color',
      title: 'Background Color',
      type: 'string',
      description: 'By selecting an option, the whole component background changes.',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'light-gray'},
          {title: 'Teal', value: 'teal'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'white',
    }),

    // Image Alignment
    defineField({
      name: 'image_alignment',
      title: 'Image Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'right',
    }),

    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required().min(5).max(160),
        }),
      ],
    }),

    // Logo / Service Pillar
    defineField({
      name: 'logo_or_service_pillar',
      title: 'Logo / Service Pillar',
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

    // Link (reuses your link object)
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description:
        'Supports internal or external URLs. Use label for the CTA text.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      kind: 'spotlight_content',
      media: 'image',
      align: 'image_alignment',
      bg: 'background_color',
    },
    prepare({title, kind, media, align, bg}) {
      const kindLabel = kind ? (kind === 'service' ? 'Service' : 'Content') : 'Spotlight'
      const bits = [kindLabel, align ? `Image: ${align}` : null, bg ? `BG: ${bg}` : null]
        .filter(Boolean)
        .join(' · ')
      return {
        title: title || 'Spotlight content & Service',
        subtitle: bits,
        media,
      }
    },
  },
})