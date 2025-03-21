import { auth } from "@/auth";
import { getUser } from "@/lib/microcms/user/getUser";
import { updateUser } from "@/lib/microcms/user/updateUser";
import { MicroCMSUserDetailResponse } from "@/types/MicroCMSResponse";
import { UpdateUserType } from "@/types/UpdateUserType";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { ValidationContext } from "@/domain/ValidationStrategy/ValidationContext";
import { UserValidationStrategy } from "@/domain/ValidationStrategy/UserValidationStrategy";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
      user: response.user,
      icon: response.icon.url,
      introduction: response.introduction,
      mail: response.mail,
    };

    return NextResponse.json({ response: payload }, { status: 200 });
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
    const body = (await request.json()) as UpdateUserType;

    const requestValidation: boolean = new ValidationContext(
      new UserValidationStrategy()
    ).executeValidation(body);

    if (!requestValidation) {
      return NextResponse.json(
        { error: "Invalid request|Validation failed" },
        { status: 400 }
      );
    }

    const response: { ok: boolean; message: string } = await updateUser({
      id: body.id,
      user: body.user,
      icon: body.icon,
      introduction: body.introduction,
      mail: body.mail,
    });

    if (!response.ok) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }

    await prisma.user.update({
      where: { email: body.mail },
      data: {
        username: body.user,
      },
    });

    return NextResponse.json({ response: response.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in PATCH /api/auth/user/edit" },
      { status: 500 }
    );
  }
};
