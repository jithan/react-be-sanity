import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'features' }),
    defineArrayMember({ type: 'textSection' }),
    defineArrayMember({ type: 'splitImage' }),
    defineArrayMember({ type: 'kalturaVideo' }),
    defineArrayMember({ type: 'ctaCardPanel' }),
    defineArrayMember({ type: 'contactCallout' }),
  ],
  options: {
    insertMenu: {
      views: [
        { name: 'grid' },
      ],
    },
  },
})