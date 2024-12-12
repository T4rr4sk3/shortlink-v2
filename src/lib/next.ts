import { revalidateTag } from "next/cache";

/** Shortcut to revalidate multiple tags in next.
 * @param tags Tags to be revalidated
 */
export function revalidateTags(...tags: string[]) {
  if(!tags.length) throw new Error("No tags to revalidate")
  tags.forEach((tag) => revalidateTag(tag))
}