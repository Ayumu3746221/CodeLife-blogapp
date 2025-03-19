import { CompositeValidator } from "../CompositeValidator";
import { MinLengthValidator } from "../MinLengthValidator";
import { MaxLengthValidator } from "../MaxLengthValidator";

describe("CompositeValidator", () => {
  // 3文字以上100文字以下のバリデーション
  const compositeValidator = new CompositeValidator([
    new MinLengthValidator(3),
    new MaxLengthValidator(100),
  ]);

  it("3文字以上かつ100文字以下の場合、trueを返す", () => {
    expect((compositeValidator as any).doValidate("Hello")).toBe(true);
    expect((compositeValidator as any).doValidate("abc")).toBe(true);
    const longValidInput = "a".repeat(100);
    expect((compositeValidator as any).doValidate(longValidInput)).toBe(true);
  });

  it("3文字未満の場合、falseを返す", () => {
    expect((compositeValidator as any).doValidate("ab")).toBe(false);
    expect((compositeValidator as any).doValidate("")).toBe(false);
  });

  it("100文字を超える場合、falseを返す", () => {
    const invalidInput = "a".repeat(101);
    expect((compositeValidator as any).doValidate(invalidInput)).toBe(false);
  });
});
