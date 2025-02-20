import {
  MicroCMSListResponse,
  MicroCMSResponse,
} from "@/type/MicroCMSResponse";
import { RequiredContentList, Article } from "@/type/RequiredContent";

export const FormatingMicroCMSListResponse = async (
  response: MicroCMSListResponse
): Promise<RequiredContentList> => {
  try {
    const formatedData: RequiredContentList = {
      contents: response.contents.map((content) => {
        const category = content.category
          ? {
              id: content.category.id,
              name: content.category.name,
            }
          : undefined;

        if (!content.content) {
          throw new FormatError(
            "Invalid data format|Missing data content in FormatingMicroCMSListResponse"
          );
        }

        const user = {
          user: content.user.user,
          icon: content.user.icon,
          introduction: content.user.introduction,
          mail: content.user.mail,
        };

        return {
          id: content.id,
          updatedAt: content.updatedAt,
          title: content.title,
          content: content.content,
          eyecatch: content.eyecatch || undefined,
          category: category,
          user: user,
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

export const FormatingMicroCMSResponse = async (
  response: MicroCMSResponse
): Promise<Article> => {
  try {
    const category = response.category
      ? {
          id: response.category.id,
          name: response.category.name,
        }
      : undefined;

    if (!response.content) {
      throw new FormatError(
        "Invalid data format|Missing data content in FormatingMicroCMSResponse"
      );
    }

    const user = {
      user: response.user.user,
      icon: response.user.icon,
      introduction: response.user.introduction,
      mail: response.user.mail,
    };

    const formatedData: Article = {
      id: response.id,
      updatedAt: response.updatedAt,
      title: response.title,
      content: response.content,
      eyecatch: response.eyecatch || undefined,
      category: category,
      user: user,
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
