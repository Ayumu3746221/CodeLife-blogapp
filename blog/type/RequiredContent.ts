type Image = {
  url: string;
  height?: number;
  width?: number;
};

type Category = {
  id: string;
  name: string;
};

type User = {
  id: string;
  user?: string;
  icon?: Image;
  introduction?: string;
  mail?: string;
};

type BlogContent = {
  id: string;
  updatedAt: string;
  title: string;
  eyecatch?: Image;
  category?: Category;
  user: User;
};

export type Article = {
  id: string;
  updatedAt: string;
  title: string;
  content: string;
  eyecatch?: Image;
  category?: Category;
  user: User;
};

export type RequiredContentList = {
  contents: BlogContent[];
};
