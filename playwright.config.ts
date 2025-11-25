// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // change to your app URL
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: isCI 
  ? [
        // All browsers ONLY in CI
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        { name: 'chrome', use: { channel: 'chrome', ...devices['Desktop Chrome'] } },
        { name: 'edge', use: { channel: 'msedge', ...devices['Desktop Edge'] } },
      ]
    : [
        // Local development → ONLY chromium
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
      ]
});
