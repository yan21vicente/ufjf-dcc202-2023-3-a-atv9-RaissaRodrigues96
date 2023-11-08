// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("index.html", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test('deve ter um meta viewport com atributo content com "width=device-width, initial-scale=1.0" no head', async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("deve ter um título no head com o número da atividade e nome do aluno", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 9: (.*)/);
  });

  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main")).toBeVisible();
  });

  test("deve ter um título no main com o nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main > h1")).toHaveText(
      /DCC202 - Atividade 9: (.*)/
    );
  });

  test("o main deve ter um parágrafo logo após o título", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const p = page.locator("main > h1+p");
    await expect(p).toBeVisible();
    await expect(p).toHaveText(
      "Esta é a página principal tem código JavaScript nela. Você só verá o resultado no console e durante a depuração."
    );
  });

  test("Deve ter um elemento script após o parágrafo.", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const script = page.locator("body > script");
    await expect(script).toBeAttached();
  });
});
