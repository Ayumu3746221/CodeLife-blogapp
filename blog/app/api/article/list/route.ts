import { fetchContentList } from "@/domain/adapter/fetchContentList";
import { ContentList } from "@/models/contentList/ContentList";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const contentList: ContentList = await fetchContentList();
    return NextResponse.json({ response: contentList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching content list:", error);
    return NextResponse.json(
      { error: "Failed to fetch content list" },
      { status: 500 }
    );
  }
}
