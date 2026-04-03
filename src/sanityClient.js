import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "lyl5ivou",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false to always get fresh data (important for previews)
  token: process.env.REACT_APP_SANITY_TOKEN,
  includeDrafts: true, // Enable draft content access
  withCredentials: true, // Allow credentials for authenticated requests
});