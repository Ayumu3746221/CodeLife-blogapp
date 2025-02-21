import { PatchContent } from "@/type/PatchContent";
import { client } from "../client";

export const updateContent = async ({
  id,
  title,
  content,
  eyecatch,
  categoryId,
  userId,
}: PatchContent): Promise<{ ok: boolean; message: string }> => {
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

    client.update({
      endpoint: "blogs",
      contentId: id,
      content: payload,
    });

    return { ok: true, message: "Success" };
  } catch (error) {
    return {
      ok: false,
      message: "Failed to update content | in updateContent fn",
    };
  }
};
