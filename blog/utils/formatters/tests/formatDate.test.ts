import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("should convert ISO date string to 'yyyy年MM月DD日' format", () => {
    const input = "2025-03-31T12:34:56Z";
    const expected = "2025/03/31";
    expect(formatDate(input)).toBe(expected);
  });

  it("should pad month and day with zeros if needed", () => {
    const input = "2025-1-1T00:00:00Z";
    const expected = "2025/01/01";
    expect(formatDate(input)).toBe(expected);
  });
});
