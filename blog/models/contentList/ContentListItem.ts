export class ContentListItem {
  id: string;
  updateAt: string;
  eyecatchUrl: string;
  title: string;
  categoryName?: string;

  constructor(data: any) {
    this.id = data.id;
    this.updateAt = data.updateAt;
    this.eyecatchUrl = data.eyecatchUrl;
    this.title = data.title;
    this.categoryName = data.categoryName;
  }
}
