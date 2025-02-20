import EditPage from "@/components/ui/dashboard/edit/EditPage";
import Menu from "@/components/ui/dashboard/Menu";
import React from "react";

export default async function ArticleEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const articleId = (await params).id;
  return (
    <div className="flex w-full">
      <Menu></Menu>
      <EditPage articleId={articleId} />
    </div>
  );
}
