import { defineConfig, devices } from '@playwright/test';

const appPort = Number(process.env.E2E_APP_PORT || 3000);
const appHost = process.env.E2E_APP_HOST || '127.0.0.1';
const isDevLan = process.env.E2E_DEV_LAN === '1';
const baseURL = `http://${appHost}:${appPort}`;
const serverCommand = isDevLan
  ? `next dev -H 0.0.0.0 -p ${appPort}`
  : `next start -H 127.0.0.1 -p ${appPort}`;

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: 'output/playwright/test-results',
  use: { baseURL },
  webServer: {
    command: serverCommand,
    url: baseURL,
    reuseExistingServer: false,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
