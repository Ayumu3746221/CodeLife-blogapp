import { Validator } from "./Validator";

export class MaxLengthValidator extends Validator {
  private maxLength: number;

  constructor(maxLength: number) {
    super();
    this.maxLength = maxLength;
  }

  protected doValidate(input: string): boolean {
    return input.length <= this.maxLength;
  }
}
