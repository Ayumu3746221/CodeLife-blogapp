"use client";

import type { Article } from "@/type/RequiredContent";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
interface ArticleProps {
  articleId: string;
}

const Article: React.FC<ArticleProps> = ({ articleId }: ArticleProps) => {
  const [article, setArticle] = useState<Article | null>(null);

  const handleArticle = async ({
    id,
    updatedAt,
    title,
    content,
    eyecatch,
    category,
  }: Article) => {
    setArticle({
      id: id,
      updatedAt: new Date(updatedAt).toLocaleDateString(),
      title: title,
      content: content,
      eyecatch: eyecatch,
      category: category,
    });
  };

  useEffect(() => {
    const params = { id: articleId };
    const query = new URLSearchParams(params);

    const fetchArticle = async (): Promise<void> => {
      const response: Response = await fetch(`/api/search/article?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch article in Article component");
      }

      const articleData = (await response.json()) as { response: Article };
      await handleArticle(articleData.response);
    };

    fetchArticle();
  }, [articleId]);

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
          <div className="mt-8">
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
