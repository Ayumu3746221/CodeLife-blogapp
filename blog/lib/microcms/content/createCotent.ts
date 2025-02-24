import { PostContent } from "@/types/PostContent";
import { client } from "../client";

export const createContent = async ({
  title,
  content,
  eyecatch,
  categoryId,
  userId,
}: PostContent): Promise<{ ok: boolean; message: string }> => {
  try {
    const payload: { [key: string]: string } = {
      title,
      content,
      user: userId,
    };

    if (eyecatch) {
      payload["eyecatch"] = eyecatch;
    }

    if (categoryId) {
      payload["category"] = categoryId;
    }

    client.create({
      endpoint: "blogs",
      content: payload,
    });

    return { ok: true, message: "Success" };
  } catch (error) {
    return {
      ok: false,
      message: "Failed to post content | in postContent fn",
    };
  }
};
