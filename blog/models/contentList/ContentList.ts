import { ContentListItem } from "./ContentListItem";

export class ContentList {
  contents: ContentListItem[];

  constructor(data: any) {
    this.contents = data.contents.map(
      (content: any) => new ContentListItem(content)
    );
  }
}
