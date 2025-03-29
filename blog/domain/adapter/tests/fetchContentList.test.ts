import { fetchContentList } from "../fetchContentList";
import { getContentList } from "@/lib/microcms/content/getContentList";
import { ContentList } from "@/models/contentList/ContentList";

// getContentList のモック化
jest.mock("@/lib/microcms/content/getContentList", () => ({
  getContentList: jest.fn(),
}));

const mockedGetContentList = getContentList as jest.Mock;

describe("fetchContentList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly map data when all fields are present", async () => {
    // 正常ケース: 全てのフィールドが存在
    const rawData = {
      contents: [
        {
          id: "1",
          eyecatch: {
            url: "https://example.com/img.jpg",
            height: 100,
            width: 100,
          },
          title: "Test Article",
          category: {
            id: "c1",
            createdAt: "",
            updatedAt: "",
            publishedAt: "",
            revisedAt: "",
            name: "Category A",
          },
          // 他フィールドは省略
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    };

    mockedGetContentList.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchContentList();
    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0]).toMatchObject({
      id: "1",
      eyecatchUrl: "https://example.com/img.jpg",
      title: "Test Article",
      categoryName: "Category A",
    });
  });

  it("should replace eyecatchUrl with default when eyecatch is null", async () => {
    // eyecatchがnullまたはundefinedの場合
    const rawData = {
      contents: [
        {
          id: "2",
          eyecatch: null,
          title: "No Eyecatch",
          category: {
            id: "c2",
            createdAt: "",
            updatedAt: "",
            publishedAt: "",
            revisedAt: "",
            name: "Category B",
          },
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    };

    mockedGetContentList.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchContentList();
    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0].eyecatchUrl).toBe("/github-icon.png");
  });

  it("should replace categoryName with default when category is null", async () => {
    // categoryがnullの場合
    const rawData = {
      contents: [
        {
          id: "3",
          eyecatch: {
            url: "https://example.com/img2.jpg",
            height: 100,
            width: 100,
          },
          title: "No Category",
          category: null,
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    };

    mockedGetContentList.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchContentList();
    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0].categoryName).toBe("");
  });
});
