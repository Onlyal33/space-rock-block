import { expect, test, type Request } from '@playwright/test';

const isCancelledRscPrefetch = async (request: Request) => {
  if (
    request.failure()?.errorText !== 'net::ERR_ABORTED' ||
    request.resourceType() !== 'fetch' ||
    !new URL(request.url()).searchParams.has('_rsc')
  ) {
    return false;
  }

  return (await request.headerValue('next-router-prefetch')) !== null;
};

test('redirects an unprefixed request to an English page and renders localized pages', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole('heading', { name: 'Earliest Asteroid Approaches' }),
  ).toBeVisible();

  await page.goto('/ru');
  await expect(
    page.getByRole('heading', { name: 'Ближайшие подлёты астероидов' }),
  ).toBeVisible();
});

test('loads a subsequent feed page and asteroid details from the fixture server', async ({
  page,
}) => {
  const nextPageResponse = page.waitForResponse((response) =>
    response.url().includes('/api/feed?page=1'),
  );
  await page.goto('/en');
  await page.getByTestId('feed-sentinel').scrollIntoViewIfNeeded();
  const response = await nextPageResponse;
  expect(response.ok()).toBe(true);
  expect(new URL(response.url()).origin).toBe(new URL(page.url()).origin);
  await expect(
    page.getByRole('link', { name: 'Asteroid Two' }).first(),
  ).toBeVisible();
  await page.getByText('Asteroid One').first().click();
  await expect(
    page.getByRole('heading', { name: 'Asteroid One' }),
  ).toBeVisible();
  await expect(page.getByText('Approaches Data')).toBeVisible();
});

test.describe('without client JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('renders SSR ORDER buttons disabled', async ({ page }) => {
    await page.goto('/en');
    await expect(
      page.getByRole('button', { name: 'ORDER' }).first(),
    ).toBeDisabled();
  });
});

test('adds an asteroid to the cart and sends an order', async ({ page }) => {
  const browserErrors: string[] = [];
  const failedRequests: Request[] = [];
  const failedDevResources: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('requestfailed', (request) => {
    if (!request.url().includes('/_vercel/insights/')) {
      failedRequests.push(request);
    }
  });
  page.on('response', (response) => {
    if (response.url().includes('/_next/') && response.status() >= 400) {
      failedDevResources.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/en');
  const firstOrderButton = page.getByRole('button', { name: 'ORDER' }).first();
  await expect(firstOrderButton).toBeEnabled();
  await firstOrderButton.click();
  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
  await expect(
    page.locator('#cart').getByText('1 asteroid', { exact: true }),
  ).toBeVisible();
  if (process.env.E2E_DEV_LAN === '1') expect(browserErrors).toEqual([]);
  const unexpectedFailedRequests = (
    await Promise.all(
      failedRequests.map(async (request) =>
        (await isCancelledRscPrefetch(request))
          ? null
          : `${request.failure()?.errorText ?? 'unknown'} ${request.url()}`,
      ),
    )
  ).filter((failure): failure is string => failure !== null);
  expect(unexpectedFailedRequests).toEqual([]);
  expect(failedDevResources).toEqual([]);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(
    page.getByRole('heading', { name: 'Order has been sent!' }),
  ).toBeVisible();
});

test('serves the static asteroid image', async ({ page }) => {
  await page.goto('/en');
  const image = page.getByAltText('Asteroid').first();
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
});
