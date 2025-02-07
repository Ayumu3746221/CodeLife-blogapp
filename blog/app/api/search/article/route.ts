import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/microcms/getContent";
import { FormatingMicroCMSResponse } from "@/lib/convert/convert";
import { MicroCMSResponse } from "@/type/MicroCMSResponse";
import { Article } from "@/type/RequiredContent";
import { ContentFetchError } from "@/lib/microcms/getContentList";

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
    return NextResponse.json({ response }, { status: 200 });
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
