import { UpdateUserType } from "@/types/UpdateUserType";
import { ValidationStrategy } from "./ValidationStrategy";
import { CompositeValidator } from "@/utils/validators/CompositeValidator";
import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";
import { MaxLengthValidator } from "@/utils/validators/MaxLengthValidator";
import { EmailValidator } from "@/utils/validators/EmailValidator";

export class UserValidationStrategy implements ValidationStrategy {
  validate(data: UpdateUserType): boolean {
    const idValid = new MinLengthValidator(1).validate(data.id);

    const userValid = new CompositeValidator([
      new MinLengthValidator(3),
      new MaxLengthValidator(50),
    ]).validate(data.user);

    const iconValid = new MinLengthValidator(1).validate(data.icon);

    const introductionValid = new CompositeValidator([
      new MinLengthValidator(1),
      new MaxLengthValidator(500),
    ]).validate(data.introduction);

    const emailValid = new EmailValidator().validate(data.mail);

    return idValid && userValid && iconValid && introductionValid && emailValid;
  }
}
