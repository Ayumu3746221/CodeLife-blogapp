import { getContentListByUser } from "@/lib/microcms/content/getContentListByUser";
import { ContentList } from "@/models/contentList/ContentList";
import { BlogContent } from "@/types/RequiredContent";
import { formatDate } from "@/utils/formatters/formatDate";

export async function fetchUserContentList(
  userEmail: string
): Promise<ContentList> {
  const rawData: BlogContent[] = await getContentListByUser(userEmail); // microCMS-jdkからデータ取得

  const filteredData: ContentList = {
    contents: rawData.map((content: BlogContent) => ({
      id: content.id,
      updateAt: formatDate(content.updatedAt),
      eyecatchUrl: content.eyecatch?.url || "/github-icon.png",
      title: content.title,
      categoryName: content.category?.name || "",
    })),
  };

  return new ContentList(filteredData);
}
