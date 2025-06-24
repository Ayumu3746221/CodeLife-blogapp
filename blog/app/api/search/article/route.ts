import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/microcms/content/getContent";
import { FormatingMicroCMSResponse } from "@/lib/convert/convert";
import { MicroCMSResponse } from "@/types/MicroCMSResponse";
import { Article } from "@/types/RequiredContent";
import { ContentFetchError } from "@/lib/microcms/content/getContentList";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: string = searchParams.get("id") || "";

    if (id === "" || id === null) {
      return NextResponse.json(
        { error: "Invalid request|Missing id" },
        { status: 400 }
      );
    }

    const article: MicroCMSResponse = await getContent(id as string);
    const response: Article = await FormatingMicroCMSResponse(article);
    return NextResponse.json({ response }, { status: 200 }).headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate");
  } catch (error) {
    if (error instanceof ContentFetchError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
