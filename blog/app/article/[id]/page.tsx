import Article from "@/components/ui/article/Article";

const articlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  return <Article articleId={articleId} />;
};

export default articlePage;
