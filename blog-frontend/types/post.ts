export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  color?: string;
}

export interface Author {
  name: string;
  slug: {
    current: string;
  };
  image?: any;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  categories: Category[];
  tags?: string[];
  author?: Author;
  viewCount?: number;
}
