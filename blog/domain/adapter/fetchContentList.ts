import { getContentList } from "@/lib/microcms/content/getContentList";
import { ContentList } from "@/models/ContentList";
import { MicroCMSListResponse } from "@/types/MicroCMSResponse";
import { BlogContent } from "@/types/RequiredContent";

export async function fetchContentList(): Promise<ContentList> {
  const rawData: MicroCMSListResponse = await getContentList(); // microCMS-jdkからデータ取得

  const filteredData = {
    contents: rawData.contents.map((content: BlogContent) => ({
      id: content.id,
      eyecatchUrl: content.eyecatch?.url || "/github-icon.png",
      title: content.title,
      categoryName: content.category?.name || "",
    })),
  };

  return new ContentList(filteredData);
}
