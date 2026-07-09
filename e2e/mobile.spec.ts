import { test, expect } from '@playwright/test';

test.describe('Mobile sidebar drawer', () => {
  test('starts closed, opens via the hamburger button, and closes via the backdrop', async ({
    page,
  }) => {
    await page.goto('/');

    const analyticsLink = page.getByRole('link', { name: /analytics/i });
    const hamburger = page.getByRole('button', { name: /toggle sidebar/i });

    // Closed by default: the drawer is off-screen, so its content
    // shouldn't be in the visible viewport.
    await expect(analyticsLink).not.toBeInViewport();

    await hamburger.click();
    await expect(analyticsLink).toBeInViewport();

    // Tapping the backdrop (visible strip to the right of the drawer,
    // below the header) closes it again.
    await page.locator('body').click({ position: { x: 370, y: 300 } });
    await expect(analyticsLink).not.toBeInViewport();
  });

  test('dashboard widgets are usable without opening the drawer', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.getByText('Brent Price', { exact: true })).toBeVisible();
    await expect(page.getByText('BTC Chart', { exact: true })).toBeVisible();
    await expect(page.getByText('BTC Stats', { exact: true })).toBeVisible();
  });
});
