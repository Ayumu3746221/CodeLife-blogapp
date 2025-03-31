import { auth } from "@/auth";
import { fetchUserContentList } from "@/domain/adapter/fetchUserContentList";
import { ContentFetchError } from "@/lib/microcms/content/getContentList";
import { ContentList } from "@/models/contentList/ContentList";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session: Session | null = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.email === undefined || session.user.email === "") {
    return NextResponse.json(
      { error: "Unauthorized | user undefined" },
      { status: 401 }
    );
  }

  if (session.user.email === null) {
    return NextResponse.json(
      { error: "Unauthorized | user null" },
      { status: 401 }
    );
  }

  try {
    const userEmail: string = session.user.email;
    const contents: ContentList = await fetchUserContentList(userEmail);
    return NextResponse.json({ response: contents }, { status: 200 });
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
