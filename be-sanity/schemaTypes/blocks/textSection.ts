import {defineField, defineType} from 'sanity'
import {MdTextFields as icon} from 'react-icons/md'

export default defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Dark', value: 'gray-900' },
        ],
        layout: 'radio',
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare(selection) {
      const { title, content } = selection
      return {
        title: title || 'Text Section',
        subtitle: content?.[0]?.children?.[0]?.text?.substring(0, 50) || 'Text Section',
        media: icon,
      }
    },
  },
})