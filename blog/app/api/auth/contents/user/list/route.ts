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

interface AuthenticatedRequest extends NextRequest {
  auth: Session | null;
}

export const GET = auth(async function GET(
  request: AuthenticatedRequest,
  context: { params?: Record<string, string | string[]> } = {}
): Promise<NextResponse> {
  if (!request.auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.auth.user.email === undefined || request.auth.user.email === "") {
    return NextResponse.json(
      { error: "Unauthorized | user undefined" },
      { status: 401 }
    );
  }

  if (request.auth.user.email === null) {
    return NextResponse.json(
      { error: "Unauthorized | user null" },
      { status: 401 }
    );
  }

  try {
    const userEmail: string = request.auth.user.email;
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
});
