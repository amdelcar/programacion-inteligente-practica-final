import { expect, test } from '@playwright/test'

test('displays the launch catalogue', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Upcoming launches' }),
  ).toBeVisible()
})
