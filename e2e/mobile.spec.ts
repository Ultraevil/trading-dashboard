import { test, expect } from '@playwright/test';
import { t } from './i18n';

test.describe('Mobile sidebar drawer', () => {
  test('starts closed, opens via the hamburger button, and closes via the backdrop', async ({
    page,
  }) => {
    await page.goto('/');

    const analyticsLink = page.getByRole('link', {
      name: t('sidebar.nav.analytics'),
    });
    const hamburger = page.getByRole('button', {
      name: t('header.toggleSidebar'),
    });

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

    await expect(
      page.getByText(t('widgets.price.title'), { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(t('widgets.chart.title'), { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(t('widgets.stats.title'), { exact: true }),
    ).toBeVisible();
  });
});
