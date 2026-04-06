import {defineField, defineType} from 'sanity'
import {MdWeb as icon} from 'react-icons/md'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showInHeaderMenu',
      title: 'Show in Header Menu',
      type: 'boolean',
      description: 'Enable this to display this page in the header navigation menu',
      initialValue: false,
    }),
    defineField({
      name: 'menuTitle',
      title: 'Menu Title',
      type: 'string',
      description: 'Custom title to display in the menu (defaults to page title)',
      hidden: ({ parent }) => !parent?.showInHeaderMenu,
    }),
    defineField({
      name: 'menuOrder',
      title: 'Menu Order',
      type: 'number',
      description: 'Order in the header menu (lower numbers appear first)',
      hidden: ({ parent }) => !parent?.showInHeaderMenu,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'pageBuilder',
      description: 'Build your page using the available blocks',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      description: 'description',
      showInHeaderMenu: 'showInHeaderMenu',
      menuTitle: 'menuTitle',
    },
    prepare(selection) {
      const { title, slug, description, showInHeaderMenu, menuTitle } = selection
      const displayTitle = showInHeaderMenu ? `${title} 📍` : title
      const subtitle = showInHeaderMenu
        ? `/${slug?.current || ''} • Menu: ${menuTitle || title}`
        : `/${slug?.current || ''}`

      return {
        title: displayTitle,
        subtitle: subtitle,
        description: description,
        media: icon,
      }
    },
  },
})