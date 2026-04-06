import { defineType, defineField } from "sanity";

export default defineType({
  name: "sidebarSection",
  title: "Sidebar Section",
  type: "object",

  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "linkWithIcon" }],
    }),
  ],
});