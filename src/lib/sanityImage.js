import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanityClient"; // adjust path if needed

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}