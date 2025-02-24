import { client } from "../client";
import { MicroCMSResponse } from "@/types/MicroCMSResponse";
import { ContentFetchError } from "./getContentList";

export const getContent = async (id: string): Promise<MicroCMSResponse> => {
  try {
    const response: MicroCMSResponse = await client.get({
      endpoint: "blogs",
      contentId: id,
    });
    return response as MicroCMSResponse;
  } catch (error: Error | any) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new ContentFetchError(401, "Unauthorized in getContent");
        case 403:
          throw new ContentFetchError(403, "Forbidden in getContent");
        case 404:
          throw new ContentFetchError(404, "Not Found in getContent");
        case 429:
          throw new ContentFetchError(429, "Too Many Requests in getContent");
        case 500:
          throw new ContentFetchError(
            500,
            "Internal Server Error in getContent"
          );
        default:
          throw new ContentFetchError(
            error.response.status,
            error.response.statusText
          );
      }
    }
    throw new ContentFetchError(0, "Unknown Error in getContent");
  }
};
