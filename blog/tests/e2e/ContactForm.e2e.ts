import { test, expect } from "@playwright/test";

test.describe("Contact Form E2E", () => {
  test("有効な入力の場合、メッセージ送信に成功する", async ({ page }) => {
    await page.goto("/contact");

    // 入力フィールドに有効なデータを入力
    await page.fill('input[name="title"]', "Valid Title");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill(
      'textarea[name="message"]',
      "This is a valid message with sufficient length."
    );

    // ボタンをクリックしたと同時にページ遷移を待つ
    await Promise.all([
      page.waitForURL("**/"), // ホームページ（"/"）への遷移を待つ
      page.click('button[type="submit"]'),
    ]);

    // ホームページに正しく遷移していることを検証
    await expect(page).toHaveURL("http://127.0.0.1:3000/");
  });

  test("無効な入力の場合、エラーメッセージが表示される", async ({ page }) => {
    await page.goto("/contact");

    // 入力フィールドに無効なデータを入力
    await page.fill('input[name="title"]', "a"); // タイトルが短すぎる
    await page.fill('input[name="email"]', "invalid@email"); // 無効なメール形式
    await page.fill('textarea[name="message"]', "short"); // メッセージが短すぎる

    // 送信ボタンをクリック
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されることを検証
    await expect(page.locator("text=Validation faild")).toBeVisible({
      timeout: 5000,
    });
  });
});
