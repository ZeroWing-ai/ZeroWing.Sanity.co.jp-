import { groq } from 'next-sanity';

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    author->{
      name,
      slug,
      image
    }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    author->{
      name,
      slug,
      image
    }
  }
`;

export const postsByTagQuery = groq`
  *[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    author->{
      name,
      slug,
      image
    }
  }
`;

export const allTagsQuery = groq`
  {
    "tags": array::unique(
      *[_type == "post" && defined(tags)].tags[]
    )
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    categories[]->{
      _id,
      title,
      slug,
      color
    },
    tags,
    author->{
      name,
      slug,
      image,
      role,
      bio,
      "socialLinks": {
        twitter,
        github,
        website
      }
    }
  }
`;
