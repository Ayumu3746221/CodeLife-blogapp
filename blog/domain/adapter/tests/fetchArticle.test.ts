import { fetchArticle } from "../fetchArticle";
import { getContent } from "@/lib/microcms/content/getContent";

// getContent をモック化
jest.mock("@/lib/microcms/content/getContent");
const mockedGetContent = getContent as jest.Mock;

describe("fetchArticle", () => {
  it("すべてのフィールドが存在する場合、正しく Article を返す", async () => {
    const rawData = {
      id: "article-1",
      createdAt: "2023-10-10T00:00:00Z",
      updatedAt: "2023-10-10T00:00:00Z",
      publishedAt: "2023-10-10T00:00:00Z",
      revisedAt: "2023-10-10T00:00:00Z",
      title: "Test Article",
      content: "This is a test article.",
      eyecatch: {
        id: "image-1",
        url: "https://example.com/image.jpg",
        height: 800,
        width: 600,
      },
      category: {
        id: "cat-1",
        createdAt: "2023-10-10T00:00:00Z",
        updatedAt: "2023-10-10T00:00:00Z",
        publishedAt: "2023-10-10T00:00:00Z",
        revisedAt: "2023-10-10T00:00:00Z",
        name: "Tech",
      },
      user: {
        id: "user-1",
        createdAt: "2023-10-10T00:00:00Z",
        updatedAt: "2023-10-10T00:00:00Z",
        publishedAt: "2023-10-10T00:00:00Z",
        revisedAt: "2023-10-10T00:00:00Z",
        user: "Alice",
        icon: {
          id: "icon-1",
          url: "https://example.com/icon.jpg",
          height: 100,
          width: 100,
        },
        introduction: "Hello, I am Alice.",
        mail: "alice@example.com",
      },
    };

    mockedGetContent.mockResolvedValue(rawData);

    const article = await fetchArticle("article-1");

    expect(article.id).toBe("article-1");
    expect(article.updatedAt).toBe("2023-10-10T00:00:00Z");
    expect(article.title).toBe("Test Article");
    expect(article.content).toBe("This is a test article.");
    expect(article.eyecatchUrl).toBe("https://example.com/image.jpg");
    expect(article.categoryName).toBe("Tech");
    expect(article.user.id).toBe("user-1");
    expect(article.user.user).toBe("Alice");
    expect(article.user.iconUrl).toBe("https://example.com/icon.jpg");
    expect(article.user.introduction).toBe("Hello, I am Alice.");
    expect(article.user.mail).toBe("alice@example.com");
  });

  it("eyecatchとcategoryが存在しない場合、デフォルト値が適用される", async () => {
    const rawData = {
      id: "article-2",
      createdAt: "2023-10-15T00:00:00Z",
      updatedAt: "2023-10-15T00:00:00Z",
      publishedAt: "2023-10-15T00:00:00Z",
      revisedAt: "2023-10-15T00:00:00Z",
      title: "Article without image and category",
      content: "This article doesn't have eyecatch and category.",
      eyecatch: null,
      category: null,
      user: {
        id: "user-2",
        createdAt: "2023-10-15T00:00:00Z",
        updatedAt: "2023-10-15T00:00:00Z",
        publishedAt: "2023-10-15T00:00:00Z",
        revisedAt: "2023-10-15T00:00:00Z",
        user: "Bob",
        icon: null,
        introduction: "Hi, I am Bob.",
        mail: "bob@example.com",
      },
    };

    mockedGetContent.mockResolvedValue(rawData);

    const article = await fetchArticle("article-2");

    // 表示するべきデフォルト値の検証
    expect(article.eyecatchUrl).toBe("/github-icon.png");
    expect(article.categoryName).toBe("");
  });
});
