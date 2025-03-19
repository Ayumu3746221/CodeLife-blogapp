import { NextRequest, NextResponse } from "next/server";
import type { Contact } from "@/types/Contact";
import { sendMail } from "@/lib/nodemailer/sendMail";
import { ValidationContext } from "@/domain/ValidationStrategy/ValidationContext";
import { ContactValidationStrategy } from "@/domain/ValidationStrategy/ContactValidationStrategy";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Contact;
    const validationResult = new ValidationContext(
      new ContactValidationStrategy()
    ).executeValidation(body);

    if (!validationResult) {
      return NextResponse.json({ error: "Validation faild" }, { status: 400 });
    }

    const contactData = body as Contact;
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
