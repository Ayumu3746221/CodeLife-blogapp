export type UploadMediaResult = {
  ok: boolean;
  url?: string;
};

async function uploadMedia(file: File | Blob): Promise<UploadMediaResult> {
  const SERVICE_ID = process.env.MICROCMS_SERVICE_DOMAIN;
  const API_KEY = process.env.MICROCMS_API_KEY || "";

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `https://${SERVICE_ID}.microcms-management.io/api/v1/media`,
    {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    return { ok: false };
  }
  const json = await response.json();
  return { ok: true, url: json.url };
}

export { uploadMedia };
