import { Page } from '@playwright/test';

export type NavigationLink = {
  name: string;
  href: string;
};

export type NavigationResult = NavigationLink & {
  status: number | null;
  finalUrl: string;
  error?: string;
};

export class TheInternetHomePage {
  private readonly homeUrl = 'https://the-internet.herokuapp.com/';
  private readonly navigationLinks = 'h2:has-text("Available Examples") + ul a';

  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.homeUrl, { waitUntil: 'domcontentloaded' });
  }

  async getNavigationLinks(): Promise<NavigationLink[]> {
    return this.page.locator(this.navigationLinks).evaluateAll((links) =>
      links.map((link) => ({
        name: (link.textContent ?? '').trim(),
        href: (link as HTMLAnchorElement).href,
      })),
    );
  }

  async navigateTo(link: NavigationLink): Promise<NavigationResult> {
    try {
      const response = await this.page.goto(link.href, { waitUntil: 'domcontentloaded' });

      return {
        ...link,
        status: response?.status() ?? null,
        finalUrl: this.page.url(),
      };
    } catch (error) {
      return {
        ...link,
        status: null,
        finalUrl: this.page.url(),
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}