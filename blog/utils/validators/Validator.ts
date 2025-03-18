export abstract class Validator {
  public validate(input: string): boolean {
    return this.doValidate(input);
  }

  protected abstract doValidate(input: string): boolean;
}
