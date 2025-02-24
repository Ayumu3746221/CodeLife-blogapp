import { MicroCMSCategoryResponse } from "@/types/MicroCMSResponse";
import { client } from "./client";
import { ContentFetchError } from "./content/getContentList";

export const getCategory = async (): Promise<MicroCMSCategoryResponse> => {
  const response = await client.get({
    endpoint: "categories",
    queries: { fields: "id,name" },
  });

  if (!response.contents) {
    throw new ContentFetchError(1, "No contents found");
  }

  return response as MicroCMSCategoryResponse;
};
