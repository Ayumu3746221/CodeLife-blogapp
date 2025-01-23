import { getContentList } from "../getContentList";
import { client } from "../client";

jest.mock("../client", () => ({
  client: {
    get: jest.fn(),
  },
}));

describe("getContentList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("認証エラーの場合、適切なエラーメッセージをスローすること", async () => {
    const mockError = {
      response: { status: 401 },
    };
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Unauthorized");
  });

  test("アクセス権限が不足している場合、適切なエラーメッセージをスローすること", async () => {
    const mockError = {
      response: { status: 403 },
    };
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Forbidden");
  });

  test("Not Found、適切なエラーメッセージをスローすること", async () => {
    const mockError = {
      response: { status: 404 },
    };
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Not Found");
  });

  test("レートリミットエラーの場合、適切なエラーメッセージをスローすること", async () => {
    const mockError = {
      response: { status: 429 },
    };
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Too Many Requests");
  });

  test("サーバーエラー時に、適切なエラーメッセージをスローすること", async () => {
    const mockError = {
      response: { status: 500 },
    };
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Internal Server Error");
  });

  test("原因不明な、適切なエラーメッセージをスローすること", async () => {
    const mockError = new Error("Network Error");
    (client.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getContentList()).rejects.toThrow("Unknown Error");
  });
});
