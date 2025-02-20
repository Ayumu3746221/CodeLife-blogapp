type Image = {
  id?: string;
  url: string;
  height: number;
  width: number;
};

type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

type RequestCategory = {
  id: string;
  name: string;
};

type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  user: string;
  icon: Image;
  introduction: string;
  mail: string;
};

type BlogContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: Image;
  category: Category;
  user: User;
};

export type MicroCMSListResponse = {
  contents: BlogContent[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type MicroCMSResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: Image;
  category: Category;
  user: User;
};

export type MicroCMSMediaResponse = {
  media: Image[];
};

export type MicroCMSCategoryResponse = {
  contents: RequestCategory[];
  totalCount: number;
  offset: number;
  limit: number;
};
