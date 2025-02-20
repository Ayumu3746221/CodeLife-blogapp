import { MicroCMSMediaResponse } from "@/type/MicroCMSResponse";

const getMedia = async (): Promise<MicroCMSMediaResponse> => {
  const SERVICE_ID = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY || "";

  const response: Response | void = await fetch(
    `https://${SERVICE_ID}.microcms-management.io/api/v2/media?imageOnly=true`,
    {
      method: "GET",
      headers: {
        "X-MICROCMS-API-KEY": key,
      },
    }
  ).catch((error) => {
    console.error("Error | data fetching from microCMS", error);
  });

  if (response) {
    const data = await response.json();
    return data as MicroCMSMediaResponse;
  }

  return { media: [] };
};

export default getMedia;
