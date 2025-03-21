import { MaxLengthValidator } from "../MaxLengthValidator";

describe("MaxLengthValidator", () => {
  const maxLength = 5;
  const validator = new MaxLengthValidator(maxLength);

  it("入力の文字数がmaxLengthより多い場合、falseを返す", () => {
    expect((validator as any).doValidate("abcdef")).toBe(false);
  });

  it("入力の文字数がmaxLengthと同じ場合、trueを返す", () => {
    expect((validator as any).doValidate("abcde")).toBe(true);
  });

  it("入力の文字数がmaxLengthより少ない場合、trueを返す", () => {
    expect((validator as any).doValidate("abcd")).toBe(true);
  });

  it("入力の文字が空欄でnullが渡ってきた時、trueを返す", () => {
    expect((validator as any).doValidate(null)).toBe(true);
  });
});
