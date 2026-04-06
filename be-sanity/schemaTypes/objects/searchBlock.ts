export default {
  name: "searchBlock",
  title: "Search Block",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "placeholder",
      title: "Placeholder Text",
      type: "string",
      initialValue: "Search services..."
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "searchTypes",
      title: "Search Types",
      type: "array",
      of: [{ type: "string" }],
      description: "Which content types to search (services, blog, etc)"
    }
  ]
};