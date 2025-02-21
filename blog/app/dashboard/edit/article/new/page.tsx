import { auth } from "@/auth";
import CreateArticlePage from "@/components/ui/dashboard/edit/CreateArticlePage";
import Menu from "@/components/ui/dashboard/Menu";
import { Session } from "next-auth";
import React from "react";

async function CreateArticle() {
  const session: Session | null = await auth();

  if (!session?.user || !session.user.email) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex w-full">
      <Menu />
      <CreateArticlePage mail={session.user.email} />
    </div>
  );
}

export default CreateArticle;
