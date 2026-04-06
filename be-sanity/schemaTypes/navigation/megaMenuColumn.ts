import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'megaMenuColumn',
  title: 'Mega Menu Column',
  type: 'object',

  fields: [

    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string'
    }),

    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'megaMenuItem'}]
    })

  ]
})