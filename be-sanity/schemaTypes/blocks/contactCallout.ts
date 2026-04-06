import {defineField, defineType} from 'sanity'
import {MdContactMail as icon} from 'react-icons/md'

export default defineType({
  name: 'contactCallout',
  title: 'Contact Callout',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonTarget',
      title: 'Button target',
      type: 'string',
      options: {
        list: [
          {title: 'Same tab', value: '_self'},
          {title: 'New tab', value: '_blank'},
        ],
        layout: 'radio',
      },
      initialValue: '_self',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      const plainDescription = (() => {
        if (!subtitle) return ''
        if (typeof subtitle === 'string') return subtitle
        if (!Array.isArray(subtitle)) return ''

        return subtitle
          .map((block) => {
            if (block?._type === 'block' && Array.isArray(block.children)) {
              return block.children.map((child: any) => child.text || '').join('')
            }
            return ''
          })
          .filter(Boolean)
          .join(' ')
      })()

      return {
        title: title || 'Contact Callout',
        subtitle: plainDescription ? `${plainDescription.slice(0, 80)}...` : 'Contact callout block',
      }
    },
  },
})
