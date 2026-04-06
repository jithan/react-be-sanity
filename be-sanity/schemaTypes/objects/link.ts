// schemas/objects/link.ts
import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
    defineField({name: 'openInNewTab', title: 'Open in new tab', type: 'boolean'}),
  ],
})