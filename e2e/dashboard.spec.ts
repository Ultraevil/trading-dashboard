import { test, expect } from '@playwright/test';

test.describe('Dashboard widgets', () => {
  test('loads with the three default widgets on the board', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /brent price/i }).or(
        page.getByText('Brent Price', { exact: true }),
      ),
    ).toBeVisible();
    await expect(page.getByText('BTC Chart', { exact: true })).toBeVisible();
    await expect(page.getByText('BTC Stats', { exact: true })).toBeVisible();
  });

  test('removing a widget takes it off the board', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: /remove btc stats/i })
      .click();

    await expect(page.getByText('BTC Stats', { exact: true })).toHaveCount(0);
    // the other two widgets are unaffected
    await expect(page.getByText('BTC Chart', { exact: true })).toBeVisible();
  });

  test('removing every widget shows the empty state', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /remove brent price/i }).click();
    await page.getByRole('button', { name: /remove btc chart/i }).click();
    await page.getByRole('button', { name: /remove btc stats/i }).click();

    await expect(
      page.getByText('No widgets on your dashboard yet'),
    ).toBeVisible();
  });

  test('re-adding a widget from the sidebar puts it back on the board', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /remove btc chart/i }).click();
    await expect(page.getByText('BTC Chart', { exact: true })).toHaveCount(0);

    // the sidebar's widget list toggles the same widget back on
    await page.getByRole('button', { name: /btc chart/i }).click();
    await expect(page.getByText('BTC Chart', { exact: true })).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('sidebar links navigate between Dashboard, Analytics, and Settings', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /analytics/i }).click();
    await expect(page.getByRole('heading', { name: 'Analytics' })).toBeVisible();

    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    await page.getByRole('link', { name: /dashboard/i }).click();
    await expect(page.getByText('BTC Chart', { exact: true })).toBeVisible();
  });
});

test.describe('Language switching', () => {
  test('the header language toggle translates the UI to Ukrainian and back', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /switch language/i }).click();
    await expect(page.getByText('Торговий дашборд')).toBeVisible();

    await page.getByRole('button', { name: /змінити мову/i }).click();
    await expect(page.getByText('Trading Dashboard')).toBeVisible();
  });
});
