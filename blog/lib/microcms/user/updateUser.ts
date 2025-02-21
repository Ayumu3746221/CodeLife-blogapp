import { UpdateUserType } from "@/type/updateUserType";
import { client } from "../client";

export const updateUser = async ({
  id,
  icon,
  introduction,
  mail,
}: UpdateUserType): Promise<{ ok: boolean; message: string }> => {
  try {
    const payload: { [key: string]: string } = {
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
