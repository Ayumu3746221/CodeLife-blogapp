import { getContent } from "@/lib/microcms/content/getContent";
import { Article } from "@/models/article/Article";
import { User } from "@/models/user/User";
import { MicroCMSResponse } from "@/types/MicroCMSResponse";

export async function fetchArticle(articleId: string): Promise<Article> {
  const rawData: MicroCMSResponse = await getContent(articleId); // microCMS-jdkからデータ取得

  const filteredData: Article = {
    id: rawData.id,
    updatedAt: rawData.updatedAt,
    title: rawData.title,
    content: rawData.content,
    eyecatchUrl: rawData.eyecatch?.url || "/github-icon.png",
    categoryName: rawData.category?.name || "",
    user: new User({
      id: rawData.user?.id,
      user: rawData.user?.user,
      iconUrl: rawData.user?.icon?.url,
      introduction: rawData.user?.introduction,
      mail: rawData.user?.mail,
    }),
  };

  return new Article(filteredData);
}
