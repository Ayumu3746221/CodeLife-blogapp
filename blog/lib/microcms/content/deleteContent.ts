import { client } from "../client";

export const deleteContent = async (
  id: string
): Promise<{ ok: boolean; message: string }> => {
  try {
    client.delete({
      endpoint: "blogs",
      contentId: id,
    });
    return { ok: true, message: "Success" };
  } catch (error) {
    return {
      ok: false,
      message: "Failed to delete content | in deleteContent fn",
    };
  }
};
