import { defineType, defineField } from "sanity";

export default defineType({
  name: "topicsSection",
  title: "Topics Section",
  type: "object",
  fields: [
    defineField({
      name: "mainTitle",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Topic Items",
      type: "array",
      of: [{ type: "topicItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});