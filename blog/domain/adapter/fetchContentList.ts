import { getContentList } from "@/lib/microcms/content/getContentList";
import { ContentList } from "@/models/contentList/ContentList";
import { MicroCMSListResponse } from "@/types/MicroCMSResponse";
import { BlogContent } from "@/types/RequiredContent";
import { formatDate } from "@/utils/formatters/formatDate";

export async function fetchContentList(): Promise<ContentList> {
  const rawData: MicroCMSListResponse = await getContentList(); // microCMS-jdkからデータ取得

  const filteredData = {
    contents: rawData.contents.map((content: BlogContent) => ({
      id: content.id,
      updateAt: formatDate(content.updatedAt),
      eyecatchUrl: content.eyecatch?.url || "/github-icon.png",
      title: content.title,
      categoryName: content.category?.name || "",
    })),
  };

  return new ContentList(filteredData);
}
