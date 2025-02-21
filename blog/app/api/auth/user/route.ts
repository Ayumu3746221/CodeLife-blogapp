import { auth } from "@/auth";
import { getUser } from "@/lib/microcms/user/getUser";
import { updateUser } from "@/lib/microcms/user/updateUser";
import { MicroCMSUserDetailResponse } from "@/type/MicroCMSResponse";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Invalid request|Missing id" },
        { status: 400 }
      );
    }

    const response: MicroCMSUserDetailResponse = await getUser({ id });

    const payload = {
      id: response.id,
      icon: response.icon.url,
      introduction: response.introduction,
      mail: response.mail,
    };

    return NextResponse.json({ payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in GET /api/auth/user/edit" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const response: { ok: boolean; message: string } = await updateUser({
      id: body.id,
      icon: body.icon,
      introduction: body.introduction,
      mail: body.mail,
    });

    if (!response.ok) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }

    return NextResponse.json({ response: response.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in PATCH /api/auth/user/edit" },
      { status: 500 }
    );
  }
};
