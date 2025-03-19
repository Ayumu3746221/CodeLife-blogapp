import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";

describe("MinLengthValidator", () => {
  const minLength = 5;
  const validator = new MinLengthValidator(minLength);

  it("入力の文字数がminLengthより少ない場合、falseを返す", () => {
    expect((validator as any).doValidate("abc")).toBe(false);
  });

  it("入力の文字数がminLengthと同じ場合、trueを返す", () => {
    expect((validator as any).doValidate("abcde")).toBe(true);
  });

  it("入力の文字数がminLengthより多い場合、trueを返す", () => {
    expect((validator as any).doValidate("abcdef")).toBe(true);
  });
});
