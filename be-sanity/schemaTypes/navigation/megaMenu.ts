import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'megaMenu',
  title: 'Mega Menu',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string'
    }),

    defineField({
      name: 'columns',
      title: 'Menu Columns',
      type: 'array',
      of: [{type: 'megaMenuColumn'}]
    })

  ]
})