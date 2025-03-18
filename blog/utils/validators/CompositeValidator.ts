export class CompositeValidator extends Validator {
  private validators: Validator[];

  constructor(validators: Validator[]) {
    super();
    this.validators = validators;
  }

  protected doValidate(input: string): boolean {
    return this.validators.every((validator) => validator.validate(input));
  }
}
