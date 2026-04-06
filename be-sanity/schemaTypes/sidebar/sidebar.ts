import { defineType, defineField } from "sanity";

export default defineType({
  name: "sidebar",
  title: "Sidebar",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Sidebar Title",
      type: "string",
      initialValue: "Untitled UI",
    }),

    defineField({
      name: "sections",
      title: "Sidebar Sections",
      type: "array",
      of: [{ type: "sidebarSection" }],
    }),
     defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [{ type: "linkWithIcon" }],
    }),
  ],
});