import { ValidationStrategy } from "./ValidationStrategy";

export class ValidationContext {
  private strategy: ValidationStrategy;

  constructor(strategy: ValidationStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: ValidationStrategy): void {
    this.strategy = strategy;
  }

  public executeValidation(data: any): boolean {
    return this.strategy.validate(data);
  }
}
