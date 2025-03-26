import ContentList from "@/components/ui/contents/Contents";

export default function Home() {
  return (
    <div>
      <h1 className="text-wrap text-xl lg:text-3xl mx-4 lg:mx-8 my-6 lg:my-12 border-b-2 border-neutral-950">
        Article
      </h1>
      <div className="mx-4 lg:mx-8 my-4 lg:my-8">
        <ContentList />
      </div>
    </div>
  );
}
