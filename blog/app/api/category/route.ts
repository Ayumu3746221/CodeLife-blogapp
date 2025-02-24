import { convertCategory } from "@/lib/convert/convertCategory";
import { getCategory } from "@/lib/microcms/getCategory";
import { MicroCMSCategoryResponse } from "@/types/MicroCMSResponse";
import { RequestCategory } from "@/types/RequiredCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const response: MicroCMSCategoryResponse = await getCategory();
    const data: RequestCategory = convertCategory(response);

    return NextResponse.json({ response: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
