import { ValidationContext } from "../ValidationContext";
import { ValidationStrategy } from "../ValidationStrategy";

class AlwaysTrueStrategy implements ValidationStrategy {
  validate(data: any): boolean {
    return true;
  }
}

class AlwaysFalseStrategy implements ValidationStrategy {
  validate(data: any): boolean {
    return false;
  }
}

describe("ValidationContext", () => {
  it("AlwaysTrueStrategy を使った場合、executeValidation は true を返す", () => {
    const context = new ValidationContext(new AlwaysTrueStrategy());
    expect(context.executeValidation({})).toBe(true);
  });

  it("AlwaysFalseStrategy を使った場合、executeValidation は false を返す", () => {
    const context = new ValidationContext(new AlwaysFalseStrategy());
    expect(context.executeValidation({})).toBe(false);
  });

  it("setStrategy によって戦略を変更できる", () => {
    const context = new ValidationContext(new AlwaysFalseStrategy());
    expect(context.executeValidation({})).toBe(false);
    context.setStrategy(new AlwaysTrueStrategy());
    expect(context.executeValidation({})).toBe(true);
  });
});
