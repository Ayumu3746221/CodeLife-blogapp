type Image = {
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
};

export type MicroCMSListResponse = {
  contents: BlogContent[];
  totalCount: number;
  offset: number;
  limit: number;
};
