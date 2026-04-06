// schemas/objects/FullwidthImage.ts
import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'FullwidthImage',
  title: 'Full width Image',
  type: 'object',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'field_component_id',
      title: 'Component ID',
      type: 'string',
      description: 'Unique component identifier.',
      validation: (Rule) => Rule.required().max(120),
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
      name: 'image_padding',
      title: 'Image Padding',
      type: 'string',
      description: 'Spacing around the image (top/bottom).',
      options: {
        list: [
          {title: '0', value: '0'},
          {title: '40px', value: '40px'},
          {title: '80px', value: '80px'},    // matches screenshot default
          {title: '120px', value: '120px'},
        ],
        layout: 'dropdown',
      },
      initialValue: '80px',
    }),

    // Image field with alt text
    defineField({
      name: 'image_full_width',
      title: 'Full width Image',
      type: 'image',
      description: 'Add this image for better view of the image.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
          validation: (Rule) => Rule.required().min(5).max(160),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // New field requested
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'text',
      rows: 2,
      description: 'Optional legal or contextual disclaimer shown near the image.',
      validation: (Rule) => Rule.max(280),
    }),
  ],

  preview: {
    select: {
      media: 'image_full_width',
      id: 'field_component_id',
      pad: 'image_padding',
    },
    prepare({media, id, pad}) {
      return {
        title: 'Full width Image',
        subtitle: [id, pad ? `padding: ${pad}` : null].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})