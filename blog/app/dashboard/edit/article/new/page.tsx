import CreateArticlePage from "@/components/ui/dashboard/edit/CreateArticlePage";
import Menu from "@/components/ui/dashboard/Menu";
import React from "react";

function CreateArticle() {
  return (
    <div className="flex w-full">
      <Menu />
      <CreateArticlePage />
    </div>
  );
}

export default CreateArticle;
