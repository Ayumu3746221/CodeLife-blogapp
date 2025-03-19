import { Contact } from "@/types/Contact";
import { ValidationStrategy } from "./ValidationStrategy";
import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";
import { CompositeValidator } from "@/utils/validators/CompositeValidator";
import { MaxLengthValidator } from "@/utils/validators/MaxLengthValidator";
import { EmailValidator } from "@/utils/validators/EmailValidator";

export class ContactValidationStrategy implements ValidationStrategy {
  validate(data: Contact): boolean {
    const titleValid = new CompositeValidator([
      new MinLengthValidator(3),
      new MaxLengthValidator(50),
    ]).validate(data.title);

    const emailValid = new EmailValidator().validate(data.email);

    const messageValid = new CompositeValidator([
      new MinLengthValidator(10),
      new MaxLengthValidator(2000),
    ]).validate(data.message);

    return titleValid && emailValid && messageValid;
  }
}
