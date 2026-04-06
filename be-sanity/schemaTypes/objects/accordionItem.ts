// /schemas/accordionItem.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "accordionItem",
  title: "Accordion Item",
  type: "object",
  fields: [
    defineField({
      name: "componentId",
      title: "Component ID",
      type: "string",
      description: "Unique identifier for the accordion item.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: "description",
      title: "Description",
       type: "array",
      of: [
        {
          type: "block", // Rich Text Editor
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "componentId",
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || `Accordion item ${subtitle || "(no id)"}`,
        subtitle: subtitle ? `ID: ${subtitle}` : "No component ID",
      }
    },
  },
});