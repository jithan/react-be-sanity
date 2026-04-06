//  schematypes/objects/topicItem.ts 
import { defineType, defineField } from "sanity";

export default defineType({
  name: "topicItem",
  title: "Topic Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }),
    }),
  ],
});