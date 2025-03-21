import { UserValidationStrategy } from "../UserValidationStrategy";

describe("UserValidationStrategy", () => {
  const strategy = new UserValidationStrategy();

  test("全てのフィールドが正しい値の場合は true", () => {
    const data = {
      id: "1",
      user: "username",
      icon: "icon-path",
      introduction: "This is an introduction.",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(true);
  });

  test("id が空文字の場合は false", () => {
    const data = {
      id: "",
      user: "username",
      icon: "icon-path",
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("user が空文字の場合は false", () => {
    const data = {
      id: "1",
      user: "",
      icon: "icon-path",
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("icon が空文字の場合は false", () => {
    const data = {
      id: "1",
      user: "username",
      icon: "",
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("introduction が空文字の場合は false", () => {
    const data = {
      id: "1",
      user: "username",
      icon: "icon-path",
      introduction: "",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("mail が空文字の場合は false", () => {
    const data = {
      id: "1",
      user: "username",
      icon: "icon-path",
      introduction: "intro",
      mail: "",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  // 型定義上は文字列ですが、実際の動作として null を与えた場合のテスト
  test("id が null の場合は false", () => {
    const data: any = {
      id: null,
      user: "username",
      icon: "icon-path",
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("user が null の場合は false", () => {
    const data: any = {
      id: "1",
      user: null,
      icon: "icon-path",
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("icon が null の場合は false", () => {
    const data: any = {
      id: "1",
      user: "username",
      icon: null,
      introduction: "intro",
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("introduction が null の場合は false", () => {
    const data: any = {
      id: "1",
      user: "username",
      icon: "icon-path",
      introduction: null,
      mail: "user@example.com",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("mail が null の場合は false", () => {
    const data: any = {
      id: "1",
      user: "username",
      icon: "icon-path",
      introduction: "intro",
      mail: null,
    };
    expect(strategy.validate(data)).toBe(false);
  });
});
