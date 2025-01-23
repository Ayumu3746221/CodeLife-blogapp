type Image = {
  url: string;
  height: number;
  width: number;
};

type Category = {
  id: string;
  name: string;
};

type BlogContent = {
  id: string;
  updatedAt: string;
  title: string;
  eyecatch?: Image;
  category?: Category;
};

export type RequiredContent = {
  contents: BlogContent[];
};
