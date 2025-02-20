import { MicroCMSCategoryResponse } from "@/type/MicroCMSResponse";
import { RequestCategory } from "@/type/RequiredCategory";
import { FormatError } from "./convert";

export const convertCategory = (response: MicroCMSCategoryResponse) => {
  try {
    const formatedData: RequestCategory = {
      category: response.contents.map((content) => {
        return {
          id: content.id,
          name: content.name,
        };
      }),
    };
    return formatedData;
  } catch (error) {
    if (error instanceof FormatError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new FormatError("Invalid data format|Missing data");
    }
    throw new Error("Failed to format data|Unnokwn Error");
  }
};
