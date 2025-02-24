import { auth } from "@/auth";
import { getUserId } from "@/lib/microcms/user/getUserId";
import { MicroCMSUserResponse } from "@/types/MicroCMSResponse";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const mail = searchParams.get("mail");

    if (!mail) {
      return NextResponse.json(
        { error: "Invalid request|Missing mail" },
        { status: 400 }
      );
    }

    const response: MicroCMSUserResponse = await getUserId(mail);

    const payload = {
      user: {
        id: Array.isArray(response.contents)
          ? response.contents[0].id
          : response.contents.id,
      },
    };

    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error | in GET /api/auth/user/id" },
      { status: 500 }
    );
  }
};
