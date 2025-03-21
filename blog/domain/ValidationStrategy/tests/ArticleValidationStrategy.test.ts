import { ArticleValidationStrategy } from "../ArticleValidationStrategy";

describe("ArticleValidationStrategy", () => {
  const strategy = new ArticleValidationStrategy();

  test("全てのフィールドが1文字以上なら true", () => {
    const data = { title: "a", content: "b", userId: "c" };
    expect(strategy.validate(data)).toBe(true);
  });

  test("title が空文字なら false", () => {
    const data = { title: "", content: "b", userId: "c" };
    expect(strategy.validate(data)).toBe(false);
  });

  test("content が空文字なら false", () => {
    const data = { title: "a", content: "", userId: "c" };
    expect(strategy.validate(data)).toBe(false);
  });

  test("userId が空文字なら false", () => {
    const data = { title: "a", content: "b", userId: "" };
    expect(strategy.validate(data)).toBe(false);
  });

  test("全フィールドが空文字なら false", () => {
    const data = { title: "", content: "", userId: "" };
    expect(strategy.validate(data)).toBe(false);
  });

  // ※ 下記は型定義では想定していないため any を使用
  test("title が null の場合は false (エラーにならずに検証できる前提)", () => {
    const data: any = { title: null, content: "b", userId: "c" };
    expect(strategy.validate(data)).toBe(false);
  });

  test("content が null の場合は false (エラーにならずに検証できる前提)", () => {
    const data: any = { title: "a", content: null, userId: "c" };
    expect(strategy.validate(data)).toBe(false);
  });

  test("userId が null の場合は false (エラーにならずに検証できる前提)", () => {
    const data: any = { title: "a", content: "b", userId: null };
    expect(strategy.validate(data)).toBe(false);
  });
});
