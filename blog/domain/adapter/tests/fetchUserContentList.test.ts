import { fetchUserContentList } from "../fetchUserContentList";
import { getContentListByUser } from "@/lib/microcms/content/getContentListByUser";
import { ContentList } from "@/models/contentList/ContentList";

// getContentListByUser をモック化
jest.mock("@/lib/microcms/content/getContentListByUser", () => ({
  getContentListByUser: jest.fn(),
}));

const mockedGetContentListByUser = getContentListByUser as jest.Mock;

describe("fetchUserContentList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly map data when all fields are provided", async () => {
    const inputDate = "2025-03-31T12:34:56Z";
    const expectedDate = "2025/03/31";
    const rawData = [
      {
        id: "1",
        updatedAt: inputDate,
        eyecatch: { url: "https://example.com/img.jpg" },
        title: "Test Article",
        category: { name: "Category A" },
      },
    ];

    mockedGetContentListByUser.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchUserContentList(
      "user@example.com"
    );

    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0]).toMatchObject({
      id: "1",
      updateAt: expectedDate,
      eyecatchUrl: "https://example.com/img.jpg",
      title: "Test Article",
      categoryName: "Category A",
    });
  });

  it("should replace eyecatchUrl with default when eyecatch is null", async () => {
    const inputDate = "2025-03-31T10:10:10Z";
    const expectedDate = "2025/03/31";
    const rawData = [
      {
        id: "2",
        updatedAt: inputDate,
        eyecatch: null,
        title: "No Eyecatch",
        category: { name: "Category B" },
      },
    ];

    mockedGetContentListByUser.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchUserContentList(
      "user@example.com"
    );

    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0]).toMatchObject({
      id: "2",
      updateAt: expectedDate,
      eyecatchUrl: "/github-icon.png",
      title: "No Eyecatch",
      categoryName: "Category B",
    });
  });

  it("should replace categoryName with default when category is null", async () => {
    const inputDate = "2025-03-31T09:09:09Z";
    const expectedDate = "2025/03/31";
    const rawData = [
      {
        id: "3",
        updatedAt: inputDate,
        eyecatch: { url: "https://example.com/img3.jpg" },
        title: "No Category",
        category: null,
      },
    ];

    mockedGetContentListByUser.mockResolvedValue(rawData);
    const contentList: ContentList = await fetchUserContentList(
      "user@example.com"
    );

    expect(contentList.contents).toHaveLength(1);
    expect(contentList.contents[0]).toMatchObject({
      id: "3",
      updateAt: expectedDate,
      eyecatchUrl: "https://example.com/img3.jpg",
      title: "No Category",
      categoryName: "",
    });
  });
});
