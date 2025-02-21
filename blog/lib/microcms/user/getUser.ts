import { client } from "../client";
import { MicroCMSUserDetailResponse } from "@/type/MicroCMSResponse";
import { ContentFetchError } from "../content/getContentList";

export const getUser = async ({
  id,
}: {
  id: string;
}): Promise<MicroCMSUserDetailResponse> => {
  try {
    const response: MicroCMSUserDetailResponse = await client.get({
      endpoint: "user",
      contentId: id,
    });

    return response;
  } catch (error) {
    throw new ContentFetchError(0, "Unknown Error in getUser");
  }
};
