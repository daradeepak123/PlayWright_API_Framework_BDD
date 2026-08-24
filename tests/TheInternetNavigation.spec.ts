import { test, expect } from '@playwright/test';
import { NavigationResult, TheInternetHomePage } from '../src/pages/TheInternetHomePage';

test.describe('The Internet example navigation', () => {
  test('captures and validates every example navigation', async ({ page }) => {
    const homePage = new TheInternetHomePage(page);
    await homePage.open();

    const links = await homePage.getNavigationLinks();
    expect(links.length).toBeGreaterThan(0);

    const results: NavigationResult[] = [];
    for (const link of links) {
      results.push(await homePage.navigateTo(link));
    }

    console.table(results);

    const failures = results.filter(({ status, error }) =>
      Boolean(error) ||
      status === null ||
      (status >= 400 && status !== 401 && status !== 403),
    );

    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
});