import { NextRequest, NextResponse } from "next/server";
import type { Contact } from "@/types/Contact";
import { validateContactData } from "@/lib/validate/validateContactData";
import { sendMail } from "@/lib/nodemailer/sendMail";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const validationResult = validateContactData(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation faild", details: validationResult.error },
        { status: 400 }
      );
    }

    const contactData = validationResult.data as Contact;
    const sendResult = await sendMail(contactData);

    if (!sendResult) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "You send message!!" }, { status: 200 });
}
