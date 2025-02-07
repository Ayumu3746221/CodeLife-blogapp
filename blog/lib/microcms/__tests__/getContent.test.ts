import { getContent } from "../getContent";
import { client } from "../client";
import { MicroCMSResponse } from "@/type/MicroCMSResponse";

jest.mock("../client", () => ({
  client: {
    get: jest.fn(),
  },
}));

describe("getContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("正常系: 記事を取得できること", async () => {
    const mockResponse: MicroCMSResponse = {
      id: "test-id",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-02",
      publishedAt: "2024-01-01",
      revisedAt: "2024-01-02",
      title: "Test Title",
      content: "Test Content",
      eyecatch: {
        url: "test-url",
        height: 100,
        width: 100,
      },
      category: {
        id: "category-id",
        name: "Test Category",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-02",
        publishedAt: "2024-01-01",
        revisedAt: "2024-01-02",
      },
    };

    (client.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getContent("test-id");
    expect(result).toEqual(mockResponse);
    expect(client.get).toHaveBeenCalledWith({
      endpoint: "blogs",
      contentId: "test-id",
    });
  });

  test("異常系: APIエラーの場合", async () => {
    (client.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    await expect(getContent("test-id")).rejects.toThrow(
      "Unknown Error in getContent"
    );
  });
});
