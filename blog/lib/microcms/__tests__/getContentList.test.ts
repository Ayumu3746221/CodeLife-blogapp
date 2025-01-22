import { getContentList } from "../getContentList";
import { client } from "../client";

// クライアントのモック化
jest.mock("../client", () => ({
  client: {
    get: jest.fn(),
  },
}));

type Blog = {
  id: string;
  title: string;
  content: string;
};

type MicroCMSResponse = {
  contents: Blog[];
  totalCount: number;
};

describe("getContentList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ブログ記事一覧を正常に取得できること", async () => {
    const mockData: MicroCMSResponse = {
      contents: [
        { id: "1", title: "テスト記事1", content: "テスト本文1" },
        { id: "2", title: "テスト記事2", content: "テスト本文2" },
      ],
      totalCount: 2,
    };

    (client.get as jest.Mock).mockResolvedValue(mockData);

    const result = await getContentList();

    expect(client.get).toHaveBeenCalledWith({ endpoint: "blogs" });
    expect(result).toEqual(mockData);
  });
});
