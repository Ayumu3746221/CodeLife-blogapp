"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Article } from "@/type/RequiredContent";
import Loading from "../../load/Loading";
import TitleEditor from "./TitleEditor";
import SelectMedia from "./SelectMedia";
import SelectCtegory from "./SelectCtegory";

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
    eyecatch: { url: "" },
    category: { id: "", name: "未選択" },
    user: {
      id: "",
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
  };

  const handleTitleChange = (title: string) => {
    setArticle((prev) => ({
      ...prev,
      title: title,
    }));
  };

  const handleMediaChange = (url: string) => {
    setArticle((prev) => ({
      ...prev,
      eyecatch: { url: url },
    }));
  };

  const handleCategoryChange = (id: string, name: string) => {
    setArticle((prev) => ({
      ...prev,
      category: { id: id, name: name },
    }));
  };

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-[90%] mx-auto">
        <div>
          <SelectMedia
            url={article.eyecatch?.url}
            handleMediaChange={handleMediaChange}
          />
        </div>
        <div className="my-4">
          <TitleEditor
            title={article.title}
            handleTitleChange={handleTitleChange}
          />
        </div>
        <div className="mt-2">
          <Editor
            content={article.content}
            handleArticleChange={handleArticleChange}
          />
        </div>
        <SelectCtegory
          id={article.category?.id}
          name={article.category?.name}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default EditPage;
