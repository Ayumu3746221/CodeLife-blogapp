import { ContactValidationStrategy } from "../ContactValidationStrategy";
import { Contact } from "@/types/Contact";

describe("ContactValidationStrategy", () => {
  const validator = new ContactValidationStrategy();

  it("全ての入力が有効な場合、trueを返す", () => {
    const validContact: Contact = {
      title: "お問い合わせタイトル", // 3文字以上50文字以下
      email: "user@example.com", // 正しいメール形式
      message: "お問い合わせ内容です。これは十分な長さのメッセージです。", // 10文字以上2000文字以下
    };
    expect(validator.validate(validContact)).toBe(true);
  });

  it("タイトルが3文字未満の場合、falseを返す", () => {
    const invalidContact: Contact = {
      title: "ab", // 3文字未満
      email: "user@example.com",
      message: "お問い合わせ内容です。これは十分な長さのメッセージです。",
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });

  it("タイトルが50文字を超える場合、falseを返す", () => {
    const longTitle = "a".repeat(51); // 51文字
    const invalidContact: Contact = {
      title: longTitle,
      email: "user@example.com",
      message: "お問い合わせ内容です。これは十分な長さのメッセージです。",
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });

  it("メールアドレスが無効な場合、falseを返す", () => {
    const invalidContact: Contact = {
      title: "お問い合わせタイトル",
      email: "invalid-email", // メール形式ではない
      message: "お問い合わせ内容です。これは十分な長さのメッセージです。",
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });

  it("メッセージが10文字未満の場合、falseを返す", () => {
    const invalidContact: Contact = {
      title: "お問い合わせタイトル",
      email: "user@example.com",
      message: "短い", // 10文字未満
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });

  it("メッセージが2000文字を超える場合、falseを返す", () => {
    const longMessage = "a".repeat(2001); // 2001文字
    const invalidContact: Contact = {
      title: "お問い合わせタイトル",
      email: "user@example.com",
      message: longMessage,
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });

  it("複数の項目が無効な場合、falseを返す", () => {
    const invalidContact: Contact = {
      title: "ab", // 無効（短すぎる）
      email: "invalid-email", // 無効なメール形式
      message: "short", // 無効（短すぎる）
    };
    expect(validator.validate(invalidContact)).toBe(false);
  });
});
