import { expect, test } from '@playwright/test'

test('displays the launch catalogue', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Upcoming launches' }),
  ).toBeVisible()
})

test('shows a not-found state for an unknown route', async ({ page }) => {
  await page.goto('/unknown-route')

  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to launches' })).toBeVisible()
})
