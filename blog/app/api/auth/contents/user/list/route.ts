import { auth } from "@/auth";
import { FormatingMicroCMSListResponse } from "@/lib/convert/convert";
import {
  ContentFetchError,
  getContentList,
} from "@/lib/microcms/getContentList";
import { MicroCMSListResponse } from "@/type/MicroCMSResponse";
import { RequiredContentList } from "@/type/RequiredContent";
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
    const contents: MicroCMSListResponse = await getContentList();
    const responseData: RequiredContentList =
      await FormatingMicroCMSListResponse(contents);
    const filteredContents = responseData.contents.filter(
      (response) => response.user.mail === userEmail
    );
    return NextResponse.json(
      { response: { contents: filteredContents } },
      { status: 200 }
    );
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
