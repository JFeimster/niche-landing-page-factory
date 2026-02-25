import { allVerticalSlugs } from "../../lib/verticals";

export async function generateStaticParams() {
  return allVerticalSlugs().map((slug) => ({ vertical: slug }));
}
