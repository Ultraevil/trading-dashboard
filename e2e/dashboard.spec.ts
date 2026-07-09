import { test, expect } from '@playwright/test';
import { t, tUk } from './i18n';

test.describe('Dashboard widgets', () => {
  test('loads with the three default widgets on the board', async ({
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

  test('removing a widget takes it off the board', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('button', {
        name: t('widgetContainer.removeAria', {
          title: t('widgets.stats.title'),
        }),
      })
      .click();

    await expect(
      page.getByText(t('widgets.stats.title'), { exact: true }),
    ).toHaveCount(0);
    // the other two widgets are unaffected
    await expect(
      page.getByText(t('widgets.chart.title'), { exact: true }),
    ).toBeVisible();
  });

  test('removing every widget shows the empty state', async ({ page }) => {
    await page.goto('/');

    for (const titleKey of [
      'widgets.price.title',
      'widgets.chart.title',
      'widgets.stats.title',
    ] as const) {
      await page
        .getByRole('button', {
          name: t('widgetContainer.removeAria', { title: t(titleKey) }),
        })
        .click();
    }

    await expect(page.getByText(t('dashboard.emptyTitle'))).toBeVisible();
  });

  test('re-adding a widget from the sidebar puts it back on the board', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('button', {
        name: t('widgetContainer.removeAria', {
          title: t('widgets.chart.title'),
        }),
      })
      .click();
    await expect(
      page.getByText(t('widgets.chart.title'), { exact: true }),
    ).toHaveCount(0);

    // the sidebar's widget list toggles the same widget back on
    await page
      .getByRole('button', { name: new RegExp(t('widgets.chart.title'), 'i') })
      .click();
    await expect(
      page.getByText(t('widgets.chart.title'), { exact: true }),
    ).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('sidebar links navigate between Dashboard, Analytics, and Settings', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('link', { name: t('sidebar.nav.analytics') }).click();
    await expect(
      page.getByRole('heading', { name: t('pages.analytics.title') }),
    ).toBeVisible();

    await page.getByRole('link', { name: t('sidebar.nav.settings') }).click();
    await expect(
      page.getByRole('heading', { name: t('pages.settings.title') }),
    ).toBeVisible();

    await page.getByRole('link', { name: t('sidebar.nav.dashboard') }).click();
    await expect(
      page.getByText(t('widgets.chart.title'), { exact: true }),
    ).toBeVisible();
  });
});

test.describe('Language switching', () => {
  test('the header language toggle translates the UI to Ukrainian and back', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('button', { name: t('header.toggleLanguage') })
      .click();
    await expect(page.getByText(tUk('header.brand'))).toBeVisible();

    await page
      .getByRole('button', { name: tUk('header.toggleLanguage') })
      .click();
    await expect(page.getByText(t('header.brand'))).toBeVisible();
  });
});
