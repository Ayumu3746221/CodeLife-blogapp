import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { fetchArticle } from "@/domain/adapter/fetchArticle";
import { Article } from "@/models/article/Article";

interface ArticleProps {
  articleId: string;
}

const ViewArticle: React.FC<ArticleProps> = async ({
  articleId,
}: ArticleProps) => {
  const article: Article = await fetchArticle(articleId);

  return (
    <>
      <main className="w-full min-h-screen bg-gray-50">
        <article className="h-entry max-w-4xl mx-auto p-6">
          <div className="relative w-full h-96">
            <Image
              src={article.eyecatchUrl}
              alt="eyecatch"
              fill
              className="u-photo object-cover rounded-lg"
            />
          </div>

          <div className="mt-6">
            <h2 className="p-name text-3xl font-bold text-gray-800">
              {article?.title}
            </h2>
            <p className="dt-updated text-gray-500 mt-1">{article?.updatedAt}</p>
          </div>

          <div className="e-content mt-8 w-full mx-auto prose prose-indigo">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.content || ""),
              }}
            />
          </div>

          {article?.categoryName && (
            <div className="mt-8 w-[80%] mx-auto">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                {article.categoryName}
              </span>
            </div>
          )}
        </article>
      </main>
      <div className="mb-2 border-t pt-4 w-full">
        <div className="h-card max-w-3xl mx-auto p-6">
          <h3 className="text-xl font-bold mb-4">この記事を書いた人</h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src={
                  typeof article?.user?.iconUrl === "string"
                    ? article.user.iconUrl
                    : "/default-user-icon.png"
                }
                alt={article?.user?.user || "default alt text"}
                fill
                className="u-photo rounded-full object-cover"
              />
            </div>
            <div>
              <p className="p-name text-lg font-semibold">{article?.user?.user}</p>
              <p className="text-sm text-gray-600">
                {article?.user?.introduction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewArticle;
