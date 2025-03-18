import { Validator } from "./Validator";

export class EmailValidator extends Validator {
  protected doValidate(input: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
  }
}
