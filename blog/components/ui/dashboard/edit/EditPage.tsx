"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Article } from "@/type/RequiredContent";
import Loading from "../../load/Loading";
import TextEditor from "./editor/TextEditor";
import SelectMedia from "./SelectMedia";
import SelectCategory from "./editor/SelectCategory";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("./editor/Editor"), { ssr: false });

type EditPageProps = {
  articleId?: string;
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
  const router = useRouter();

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
  }, [articleId]);

  const handleArticleChange = useCallback((content: string) => {
    setArticle((prev) => ({
      ...prev,
      content: content,
    }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setArticle((prev) => ({
      ...prev,
      title: title,
    }));
  }, []);

  const handleMediaChange = useCallback((url: string) => {
    setArticle((prev) => ({
      ...prev,
      eyecatch: { url: url },
    }));
  }, []);

  const handleCategoryChange = useCallback((id: string, name: string) => {
    setArticle((prev) => ({
      ...prev,
      category: { id: id, name: name },
    }));
  }, []);

  const handleUpdate = useCallback(async () => {
    if (article.title === "" || article.content === "") {
      return;
    }

    if (!article.user?.id) {
      return;
    }

    try {
      const response: void | Response = await fetch("/api/auth/contents", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: article.id,
          title: article.title,
          content: article.content,
          eyecatch: article.eyecatch?.url,
          categoryId: article.category?.id,
          userId: article.user.id,
        }),
      }).catch((error) => {
        console.error("Error:", error);
        return;
      });

      if (!response?.ok) {
        console.error("Error: failed to update article");
        return;
      }
    } finally {
      router.push("/dashboard");
    }
  }, [article]);

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
          <TextEditor
            subject="Title"
            text={article.title}
            handleTextChange={handleTitleChange}
          />
        </div>
        <div className="mt-2">
          <Editor
            content={article.content}
            handleArticleChange={handleArticleChange}
          />
        </div>
        <div className="mt-2">
          <SelectCategory
            id={article.category?.id}
            name={article.category?.name}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex justify-center my-4">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
