import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is not set");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY,
});
