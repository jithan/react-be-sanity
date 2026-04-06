// /schemas/accordionGroup.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "accordionGroup",
  title: "Accordion Group",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Accordion Items",
      type: "array",
      of: [{ type: "accordionItem" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: {
      itemCount: "items.length",
      firstTitle: "items.0.title",
    },
    prepare(selection) {
      const {itemCount, firstTitle} = selection
      return {
        title: `Accordion group (${itemCount || 0} item${itemCount === 1 ? "" : "s"})`,
        subtitle: firstTitle ? `First: ${firstTitle}` : "No items yet",
      }
    },
  },
});