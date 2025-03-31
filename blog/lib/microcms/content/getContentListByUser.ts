import { BlogContent } from "@/types/RequiredContent";
import { client } from "../client";
import { MicroCMSListResponse } from "@/types/MicroCMSResponse";

export const getContentListByUser = async (
  userEmail: string
): Promise<BlogContent[]> => {
  try {
    const response: MicroCMSListResponse = await client.get({
      endpoint: "blogs",
    });

    if (!response.contents) {
      throw new ContentFetchError(1, "No contents found");
    }

    // Filter out contents that are not User's articles
    const filteredContents = response.contents.filter(
      (content: BlogContent) => content.user.mail === userEmail
    );
    return filteredContents;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new ContentFetchError(401, "Unauthorized");
        case 403:
          throw new ContentFetchError(403, "Forbidden");
        case 404:
          throw new ContentFetchError(404, "Not Found");
        case 429:
          throw new ContentFetchError(429, "Too Many Requests");
        case 500:
          throw new ContentFetchError(500, "Internal Server Error");
        default:
          throw new ContentFetchError(
            error.response.status,
            error.response.statusText
          );
      }
    }
    throw new ContentFetchError(0, "Unknown Error");
  }
};

export class ContentFetchError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = "ContentFetchError";
  }
}
