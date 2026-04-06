import { defineType, defineField } from "sanity";

export default defineType({
  name: "linkWithIcon",
  title: "Link with Icon",
  type: "object",

  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),

    defineField({
      name: "url",
      title: "URL",
      type: "string", // use string for internal routes like /services
    }),

    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Grid", value: "grid" },
          { title: "PenTool", value: "pentool" },
          { title: "Folder", value: "folder" },
          { title: "Upload", value: "upload" },
          { title: "BarChart", value: "barchart" },
          { title: "Clock", value: "clock" },
          { title: "Settings", value: "settings" },
        ],
      },
    }),

    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
    }),
  ],
});