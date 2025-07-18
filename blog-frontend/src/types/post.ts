export interface Post {
  _id: string;
  title: string;
  slug: string;
  viewCount?: number;
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  categories?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  body?: any[];
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}
