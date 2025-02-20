"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Article } from "@/type/RequiredContent";
import Loading from "../../load/Loading";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

type EditPageProps = {
  articleId: string;
};

const EditPage = ({ articleId }: EditPageProps) => {
  const [article, setArticle] = useState<Article>({
    id: "",
    updatedAt: "",
    title: "",
    content: "",
    eyecatch: { url: "", height: 0, width: 0 },
    category: { id: "", name: "" },
    user: {
      user: "",
      icon: { url: "", height: 0, width: 0 },
      introduction: "",
      mail: "",
    },
  });
  const [isPending, setPending] = useState<boolean>(true);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response: void | Response = await fetch(
          `/api/search/article/?id=${articleId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch((error) => {
          console.error("Error:", error);
          setArticle((prev) => ({
            ...prev,
            content: "failed to fetch article",
          }));
          return;
        });

        if (!response?.ok) {
          setArticle((prev) => ({
            ...prev,
            content: "failed to fetch article",
          }));
          return;
        }

        const data = await response.json();
        const articleData: Article = (await data).response;

        setArticle({
          id: articleData.id,
          updatedAt: articleData.updatedAt,
          title: articleData.title,
          content: articleData.content,
          eyecatch: articleData.eyecatch,
          category: articleData.category,
          user: articleData.user,
        });
      } catch (error) {
        console.error("Error:", error);
        setArticle((prev) => ({
          ...prev,
          content: "failed to fetch article",
        }));
      } finally {
        setPending(false);
      }
    };
    dataFetch();
  }, []);

  const handleArticleChange = (content: string) => {
    setArticle((prev) => ({
      ...prev,
      content: content,
    }));
    console.log(content);
  };

  const handleTitleChange = (title: string) => {
    setArticle((prev) => ({
      ...prev,
      title: title,
    }));
  };

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-[90%] mx-auto">
        <div className="mt-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Title</h1>
          <input
            type="text"
            placeholder="Enter title"
            value={article.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
          />
        </div>
        <div className="mt-2">
          <Editor
            content={article.content}
            handleArticleChange={handleArticleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
