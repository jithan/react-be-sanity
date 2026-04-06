import {defineField, defineType} from 'sanity'
import {MdVideocam as icon} from 'react-icons/md'

export default defineType({
  name: 'kalturaVideo',
  title: 'Kaltura Video',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The Kaltura video entry ID (e.g., 1_abc123def)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnerId',
      title: 'Partner ID',
      type: 'string',
      description: 'Your Kaltura partner ID',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Optional title to display above the video',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption to display below the video',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Video width in pixels (optional, defaults to responsive)',
      validation: (rule) => rule.min(200).max(1920),
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Video height in pixels (optional, defaults to responsive)',
      validation: (rule) => rule.min(150).max(1080),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoId: 'videoId',
      partnerId: 'partnerId',
    },
    prepare(selection) {
      const {title, videoId, partnerId} = selection
      return {
        title: title || `Kaltura Video: ${videoId}`,
        subtitle: `Partner: ${partnerId}`,
        media: icon,
      }
    },
  },
})