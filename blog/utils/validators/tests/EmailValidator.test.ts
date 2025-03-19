import { EmailValidator } from "../EmailValidator";

describe("EmailValidator", () => {
  const validator = new EmailValidator();

  it("有効なメールアドレスの場合、trueを返す", () => {
    const validEmail = "test@example.com";
    expect((validator as any).doValidate(validEmail)).toBe(true);
  });

  it("メールアドレスのフォーマットが不正な場合、falseを返す", () => {
    const invalidEmail1 = "testexample.com"; // @が抜けている
    const invalidEmail2 = "test@.com"; // ドメイン名が不正
    const invalidEmail3 = "test@example"; // ドメイン部が不完全
    expect((validator as any).doValidate(invalidEmail1)).toBe(false);
    expect((validator as any).doValidate(invalidEmail2)).toBe(false);
    expect((validator as any).doValidate(invalidEmail3)).toBe(false);
  });
});
