import { MicroCMSUserResponse } from "@/type/MicroCMSResponse";
import { client } from "../client";

export const getUserId = async (
  mail: string
): Promise<MicroCMSUserResponse> => {
  const response: MicroCMSUserResponse = await client.get({
    endpoint: "user",
    queries: { filters: `mail[equals]${mail}` },
  });

  if (!response.contents) {
    throw new UserFetchError(1, "No contents found");
  }

  return response as MicroCMSUserResponse;
};

class UserFetchError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = "UserFetchError";
  }
}
