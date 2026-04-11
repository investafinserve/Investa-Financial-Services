import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value ? urlForImage(value)?.width(1200).url() : null;
      if (!url) return null;
      const alt =
        value && typeof value === "object" && "alt" in value && typeof value.alt === "string"
          ? value.alt
          : "";
      const caption =
        value && typeof value === "object" && "caption" in value && typeof value.caption === "string"
          ? value.caption
          : undefined;
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={alt}
            width={1200}
            height={675}
            className="rounded-2xl w-full h-auto border border-slate-100 shadow-sm"
          />
          {caption ? (
            <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-extrabold mt-12 mb-4 text-slate-900 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-10 mb-3 text-slate-900">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-slate-700 text-base">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-slate-600 bg-blue-50/50 py-3 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700 marker:text-blue-500">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-700">{children}</ol>
    ),
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
