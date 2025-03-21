import { Validator } from "./Validator";

export class MinLengthValidator extends Validator {
  private minLength: number;

  constructor(minLength: number) {
    super();
    this.minLength = minLength;
  }

  protected doValidate(input: string): boolean {
    if (!input) return false;
    return input.length >= this.minLength;
  }
}
