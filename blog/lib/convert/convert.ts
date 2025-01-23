import { MicroCMSListResponse } from "@/type/MicroCMSResponse";
import { RequiredContent } from "@/type/RequiredContent";

export const FormatingMicroCMSListResponse = async (
  response: MicroCMSListResponse
): Promise<RequiredContent> => {
  try {
    const formatedData: RequiredContent = {
      contents: response.contents.map((content) => {
        const category = content.category
          ? {
              id: content.category.id,
              name: content.category.name,
            }
          : undefined;

        if (!content.content) {
          throw new FormatError("Invalid data format|Missing data content");
        }

        return {
          id: content.id,
          updatedAt: content.updatedAt,
          title: content.title,
          content: content.content,
          eyecatch: content.eyecatch || undefined,
          category: category,
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

export class FormatError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "FormatError";
  }
}
