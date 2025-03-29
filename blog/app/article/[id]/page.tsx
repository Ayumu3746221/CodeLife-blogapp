import ViewArticle from "@/components/ui/article/ViewArticle";

const articlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  return <ViewArticle articleId={articleId} />;
};

export default articlePage;
