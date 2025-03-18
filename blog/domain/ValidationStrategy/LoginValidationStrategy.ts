import { ValidationStrategy } from "./ValidationStrategy";
import { LoginUserType } from "@/types/LoginUserType";
import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";

export class LoginValidationStrategy implements ValidationStrategy {
  validate(data: LoginUserType): boolean {
    const userNameValid = new MinLengthValidator(3).validate(data.username);
    const passwordValid = new MinLengthValidator(8).validate(data.password);

    return userNameValid && passwordValid;
  }
}
