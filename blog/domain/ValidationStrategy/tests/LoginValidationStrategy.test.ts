import { LoginValidationStrategy } from "../LoginValidationStrategy";
import { LoginUserType } from "@/types/LoginUserType";

describe("LoginValidationStrategy", () => {
  const validator = new LoginValidationStrategy();

  it("usernameが3文字以上、passwordが8文字以上の場合、trueを返す", () => {
    const validData: LoginUserType = {
      username: "abc",
      password: "abcdefgh",
    };
    expect(validator.validate(validData)).toBe(true);
  });

  it("usernameが3文字未満の場合、falseを返す", () => {
    const invalidData: LoginUserType = {
      username: "ab",
      password: "abcdefgh",
    };
    expect(validator.validate(invalidData)).toBe(false);
  });

  it("passwordが8文字未満の場合、falseを返す", () => {
    const invalidData: LoginUserType = {
      username: "abc",
      password: "abcdefg",
    };
    expect(validator.validate(invalidData)).toBe(false);
  });

  it("username, passwordどちらも条件を満たさない場合、falseを返す", () => {
    const invalidData: LoginUserType = {
      username: "ab",
      password: "abcdefg",
    };
    expect(validator.validate(invalidData)).toBe(false);
  });
});
