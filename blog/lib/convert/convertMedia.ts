import { MicroCMSMediaResponse } from "@/type/MicroCMSResponse";
import { RequiredMediaList } from "@/type/RequiredMedia";
import { FormatError } from "./convert";

export const ConvertMedia = (
  media: MicroCMSMediaResponse
): RequiredMediaList => {
  try {
    const formatedData: RequiredMediaList = {
      media: media.media.map((content) => {
        if (!content.id) {
          throw new FormatError(
            "Invalid data format|Missing data content in FormatingMicroCMSListResponse"
          );
        }

        return {
          id: content.id || "",
          url: content.url,
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
