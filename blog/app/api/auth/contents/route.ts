import { NextRequest, NextResponse } from "next/server";
import { PatchContent } from "@/types/PatchContent";
import { updateContent } from "@/lib/microcms/content/updateContent";
import { auth } from "@/auth";
import { deleteContent } from "@/lib/microcms/content/deleteContent";
import { PostContent } from "@/types/PostContent";
import { createContent } from "@/lib/microcms/content/createCotent";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as PostContent;
    const response: { ok: boolean; message: string } = await createContent({
      title: body.title,
      content: body.content,
      eyecatch: body.eyecatch,
      categoryId: body.categoryId,
      userId: body.userId,
    });

    if (!response.ok) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }

    return NextResponse.json({ response: response.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in POST /api/auth/contents/edit" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as PatchContent;
    const response: { ok: boolean; message: string } = await updateContent({
      id: body.id,
      title: body.title,
      content: body.content,
      eyecatch: body.eyecatch,
      categoryId: body.categoryId,
      userId: body.userId,
    });

    if (!response.ok) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }

    return NextResponse.json({ response: response.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in PATCH /api/auth/contents/edit" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const response: { ok: boolean; message: string } = await deleteContent(
      body.id
    );

    if (!response.ok) {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }

    return NextResponse.json({ response: response.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error | in DELETE /api/auth/contents/edit" },
      { status: 500 }
    );
  }
};
