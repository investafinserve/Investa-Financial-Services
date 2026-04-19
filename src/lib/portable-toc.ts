import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

export type TocItem = { _key: string; level: 2 | 3; text: string };

function isSpan(node: unknown): node is PortableTextSpan {
  return typeof node === "object" && node !== null && "_type" in node && (node as PortableTextSpan)._type === "span";
}

function textFromChildren(block: PortableTextBlock): string {
  if (!("children" in block) || !Array.isArray(block.children)) return "";
  return block.children.map((c) => (isSpan(c) && typeof c.text === "string" ? c.text : "")).join("");
}

/** Headings from Portable Text (H2/H3) for in-page TOC. Uses block `_key` as fragment ids. */
export function extractTocFromPortableText(blocks: PortableTextBlock[] | undefined): TocItem[] {
  if (!blocks?.length) return [];
  const out: TocItem[] = [];
  for (const b of blocks) {
    if (b._type !== "block" || !("_key" in b) || typeof b._key !== "string") continue;
    const style = "style" in b && typeof b.style === "string" ? b.style : "";
    if (style !== "h2" && style !== "h3") continue;
    const text = textFromChildren(b).trim();
    if (!text) continue;
    out.push({ _key: b._key, level: style === "h2" ? 2 : 3, text });
  }
  return out;
}
