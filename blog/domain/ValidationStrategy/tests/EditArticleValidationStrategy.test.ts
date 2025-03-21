import { EditArticleValidationStrategy } from "../EditArticleValidationStrategy";

describe("EditArticleValidationStrategy", () => {
  const strategy = new EditArticleValidationStrategy();

  test("id が空文字の場合は false", () => {
    const data = {
      id: "",
      title: "a",
      content: "b",
      userId: "c",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("id が null の場合は false", () => {
    const data: any = {
      id: null,
      title: "a",
      content: "b",
      userId: "c",
    };
    expect(strategy.validate(data)).toBe(false);
  });

  test("id が存在し、他のフィールドも有効な場合は true", () => {
    const data = {
      id: "123",
      title: "a",
      content: "b",
      userId: "c",
    };
    expect(strategy.validate(data)).toBe(true);
  });
});
