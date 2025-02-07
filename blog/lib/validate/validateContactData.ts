import { Contact } from "@/type/Contact";
import { z } from "zod";

const contactDataSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().nonempty({ message: "Message is required" }),
});

export function validateContactData(data: unknown) {
  const result = contactDataSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.flatten() };
  }
  return { success: true, data: result.data as Contact };
}
