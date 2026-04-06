// schemas/objects/TwoColumn.ts
import { defineType, defineField } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons'

export default defineType({
  name: 'TwoColumn',
  title: 'Two column component',
  type: 'object',
  icon: SplitHorizontalIcon,

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
      description: 'DOM id (no #). Used for in-page anchors.',
      validation: (Rule) =>
        Rule.regex(/^[A-Za-z][-A-Za-z0-9_:.]*$/).error(
          'Must be a valid HTML id: start with a letter; allow letters, digits, hyphens, underscores, colons, periods.'
        ),
    }),

    // Layout controls
    defineField({
      name: 'columns_width',
      title: 'Columns Width',
      type: 'string',
      options: {
        list: [
          { title: 'Equal', value: 'equal' },
          { title: 'Left Wide / Right Narrow (60/40)', value: '60-40' },
          { title: 'Left Narrow / Right Wide (40/60)', value: '40-60' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'equal',
    }),
    defineField({
      name: 'content_alignment',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },       // matches "flex align top"
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'background_color',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'light-gray' },
          { title: 'Teal', value: 'teal' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'white',
      description: 'Changes the whole component background color.',
    }),
    defineField({
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Auto', value: 'auto' },
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'auto',
    }),
    defineField({
      name: 'border',
      title: 'Border',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Top & Bottom', value: 'top-bottom' },
          { title: 'All', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'swap_on_mobile',
      title: 'Show right side column on top in Tab & Mobiles',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, the right column stacks above the left on small screens.',
    }),

    // Content areas (only CustomImage and HTMLBlock allowed)
    defineField({
      name: 'left_section',
      title: 'Left Section',
      type: 'array',
      of: [{ type: 'CustomImage' }, { type: 'HTMLBlock' }, { type: 'link' }],
      options: { sortable: true },
      // Uncomment the next line if you want to restrict to a single item per side:
      // validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'right_section',
      title: 'Right Section',
      type: 'array',
       of: [{ type: 'CustomImage' }, { type: 'HTMLBlock' }, { type: 'link' }],
      options: { sortable: true },
      // validation: (Rule) => Rule.max(1),
    }),
  ],

  preview: {
    select: {
      l: 'left_section',
      r: 'right_section',
      bg: 'background_color',
      split: 'columns_width',
    },
    prepare({ l, r, bg, split }) {
      const lCount = Array.isArray(l) ? l.length : 0
      const rCount = Array.isArray(r) ? r.length : 0
      return {
        title: 'Two column component',
        subtitle: `Left: ${lCount} · Right: ${rCount} · ${split || 'equal'} · BG: ${bg || 'white'}`,
      }
    },
  },
})