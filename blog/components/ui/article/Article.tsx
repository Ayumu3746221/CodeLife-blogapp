"use client";

import type { Article } from "@/types/RequiredContent";
import useSWR from "swr";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Loading from "@/components/ui/load/Loading";

const fetcher = (url: string): Promise<{ response: Article }> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch article in Article component");
    }
    return response.json();
  });
interface ArticleProps {
  articleId: string;
}

const Article: React.FC<ArticleProps> = ({ articleId }: ArticleProps) => {
  const url = `/api/search/article?${new URLSearchParams({ id: articleId })}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) {
    return <div>Error: this request is faild</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const article: Article | undefined = data?.response;

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {article?.eyecatch?.url ? (
          <div className="relative w-full h-96">
            <Image
              src={article.eyecatch.url}
              alt="eyecatch"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-800">{article?.title}</h2>
          <p className="text-gray-500 mt-1">{article?.updatedAt}</p>
        </div>

        <div className="mt-8 w-full mx-auto prose prose-indigo">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article?.content || ""),
            }}
          />
        </div>

        {article?.category?.name && (
          <div className="mt-8 w-[80%] mx-auto">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
              {article.category.name}
            </span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Article;
