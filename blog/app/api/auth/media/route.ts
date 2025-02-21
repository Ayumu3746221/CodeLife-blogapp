import { auth } from "@/auth";
import { ConvertMedia } from "@/lib/convert/convertMedia";
import getMedia from "@/lib/microcms/getMedia";
import { uploadMedia, UploadMediaResult } from "@/lib/microcms/uploadMedia";
import { MicroCMSMediaResponse } from "@/type/MicroCMSResponse";
import { RequiredMediaList } from "@/type/RequiredMedia";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const session: Session | null = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response: MicroCMSMediaResponse = await getMedia();
    const data: RequiredMediaList = ConvertMedia(response);
    return NextResponse.json({ response: data }, { status: 200 });
  } catch (error) {
    console.error("Error | data fetching from microCMS", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export type UploadMediaAPIResponse = {
  media: { url: string; status: number };
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const session: Session | null = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const fileField = formData.get("file");
    if (!fileField || !(fileField instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mediaUrl: UploadMediaResult = await uploadMedia(fileField);

    if (mediaUrl.ok === false) {
      return NextResponse.json(
        { error: "Faild upload media" },
        { status: 500 }
      );
    }

    return NextResponse.json({ media: { url: mediaUrl.url } }, { status: 200 });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
