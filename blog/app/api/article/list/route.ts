import { fetchContentList } from "@/domain/adapter/fetchContentList";
import { ContentList } from "@/models/contentList/ContentList";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contentList: ContentList = await fetchContentList();
    const response = NextResponse.json(
      { response: contentList },
      { status: 200 }
    );
    response.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate");
    return response;
  } catch (error) {
    console.error("Error fetching content list:", error);
    return NextResponse.json(
      { error: "Failed to fetch content list" },
      { status: 500 }
    );
  }
}
