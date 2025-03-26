export class ContentListItem {
  id: string;
  eyecatchUrl: string;
  title: string;
  categoryName?: string;

  constructor(data: any) {
    this.id = data.id;
    this.eyecatchUrl = data.eyecatchUrl;
    this.title = data.title;
    this.categoryName = data.categoryName;
  }
}
