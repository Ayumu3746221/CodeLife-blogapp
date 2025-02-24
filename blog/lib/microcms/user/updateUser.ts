import { UpdateUserType } from "@/types/UpdateUserType";
import { client } from "../client";

export const updateUser = async ({
  id,
  user,
  icon,
  introduction,
  mail,
}: UpdateUserType): Promise<{ ok: boolean; message: string }> => {
  try {
    const payload: { [key: string]: string } = {
      user,
      icon,
      introduction,
      mail,
    };

    client.update({
      endpoint: "user",
      contentId: id,
      content: payload,
    });

    return { ok: true, message: "Success" };
  } catch (error) {
    return {
      ok: false,
      message: "Failed to update user | in updateUser",
    };
  }
};
