import { test, expect } from "@playwright/test";

test.describe("Navigation Test", () => {
  test("ホーム画面から各ページに正しく移動できる", async ({ page }) => {
    // ホームページへ移動
    await page.goto("/");

    // Portfolioページへのリンクが表示されているか検証し、クリック
    const portfolioLink = page.locator('a[href="/portfolio"]');
    await expect(portfolioLink).toBeVisible();
    await portfolioLink.click();
    await expect(page).toHaveURL(/\/portfolio/);

    // ホームページへ戻る
    await page.goto("/");

    // Contactページへのリンクが表示されているか検証し、クリック
    const contactLink = page.locator('a[href="/contact"]');
    await expect(contactLink).toBeVisible();
    await contactLink.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
