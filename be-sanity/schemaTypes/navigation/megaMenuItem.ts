import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'megaMenuItem',
  title: 'Mega Menu Item',
  type: 'object',

  fields: [

    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true}
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'string'
    }),

    defineField({
      name: 'link',
      title: 'Page Link',
      type: 'reference',
      to: [
        {type: 'page'},
        {type: 'Services'},
        {type: 'Landingpage'}
      ]
    })

  ]
})