import { NextResponse } from "next/server";
import { fetchContentList } from "@/domain/adapter/fetchContentList";
import { ContentList } from "@/models/ContentList";

export async function GET() {
  try {
    const response: ContentList = await fetchContentList();
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching content list:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
