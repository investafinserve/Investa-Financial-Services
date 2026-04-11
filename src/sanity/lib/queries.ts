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

export const postsForHomeQuery = `*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt)
] | order(publishedAt desc) [0...4] {
  ${postListFields}
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
