export const postListFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  author,
  category,
  readTimeMinutes
`;

/** Latest posts for homepage + total published count (single request). */
export const postsForHomeWithTotalQuery = `{
  "posts": *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt)
  ] | order(publishedAt desc) [0...3] {
    ${postListFields}
  },
  "total": count(*[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt)
  ])
}`;

export function postsPaginatedQuery(start: number, end: number) {
  return `{
    "posts": *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      ($search == "" || title match $search || excerpt match $search)
    ] | order(publishedAt desc) [${start}...${end}] {
      ${postListFields}
    },
    "total": count(*[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      ($search == "" || title match $search || excerpt match $search)
    ])
  }`;
}

export const postBySlugQuery = `*[
  _type == "post" &&
  slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  author,
  category,
  readTimeMinutes,
  body
}`;

/**
 * Same-category posts first (newest), then recent posts excluding the current slug.
 * Caller merges and dedupes to a fixed limit — not random; stable for caching/SEO.
 */
export const relatedPostsBundleQuery = `{
  "byCategory": *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    slug.current != $slug &&
    defined($category) &&
    $category != "" &&
    category == $category
  ] | order(publishedAt desc) [0...3] {
    ${postListFields}
  },
  "recent": *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    slug.current != $slug
  ] | order(publishedAt desc) [0...8] {
    ${postListFields}
  }
}`;

export const allPostSlugsQuery = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt)
] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt
}`;

export const postsForRssQuery = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt)
] | order(publishedAt desc) [0...50] {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
}`;
