import { User } from "../user/User";

export class Article {
  id: string;
  updatedAt: string;
  title: string;
  content: string;
  eyecatchUrl: string;
  categoryName?: String;
  user: User;

  constructor(data: any) {
    this.id = data.id;
    this.updatedAt = data.updatedAt;
    this.title = data.title;
    this.content = data.content;
    this.eyecatchUrl = data.eyecatchUrl;
    this.categoryName = data.categoryName;
    this.user = data.user;
  }
}
