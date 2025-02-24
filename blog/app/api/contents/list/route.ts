import { NextResponse } from "next/server";
import {
  getContentList,
  ContentFetchError,
} from "@/lib/microcms/content/getContentList";
import { FormatingMicroCMSListResponse } from "@/lib/convert/convert";
import { MicroCMSListResponse } from "@/types/MicroCMSResponse";
import { RequiredContentList } from "@/types/RequiredContent";

export async function GET() {
  try {
    const contents: MicroCMSListResponse = await getContentList();
    const response: RequiredContentList = await FormatingMicroCMSListResponse(
      contents
    );
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
