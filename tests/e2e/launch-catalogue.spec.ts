import { expect, test, type Page } from '@playwright/test'

const launch = (overrides: Record<string, unknown> = {}) => ({
  id: 'launch-1',
  rocketId: 'rocket-1',
  rocketName: 'Test Falcon',
  scheduledDate: '2026-12-07T18:29:32.421Z',
  price: 4999,
  minimumPassengers: 1,
  status: 'active',
  totalSeats: 10,
  bookedSeats: 0,
  availableSeats: 10,
  ...overrides,
})

async function mockLaunches(page: Page, launches: unknown[]) {
  await page.route('**/api/launches', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ value: launches, Count: launches.length }),
    })
  })
}

test.describe('launch catalogue', () => {
  test('displays launch details and an available action', async ({ page }) => {
    await mockLaunches(page, [launch()])
    await page.goto('/')

    await expect(page.getByText('Test Falcon')).toBeVisible()
    await expect(page.getByText('€4,999.00')).toBeVisible()
    await expect(page.getByText('Available', { exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View details' })).toBeVisible()
  })

  test('marks a full launch as unavailable and removes its action', async ({
    page,
  }) => {
    await mockLaunches(page, [launch({ availableSeats: 0, bookedSeats: 10 })])
    await page.goto('/')

    await expect(page.getByText('Unavailable')).toBeVisible()
    await expect(page.getByText('Fully booked')).toBeVisible()
    await expect(page.getByRole('link', { name: 'View details' })).toHaveCount(0)
  })

  test('shows an empty state when the API returns no launches', async ({
    page,
  }) => {
    await mockLaunches(page, [])
    await page.goto('/')

    await expect(
      page.getByText('No launches are available right now.'),
    ).toBeVisible()
  })

  test('offers retry after an API error', async ({ page }) => {
    let requestCount = 0
    await page.route('**/api/launches', async (route) => {
      requestCount += 1
      if (requestCount === 1) {
        await route.fulfill({ status: 503, body: 'unavailable' })
        return
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ value: [launch()], Count: 1 }),
      })
    })
    await page.goto('/')

    await expect(
      page.getByText('We could not load launches from the API.'),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('Test Falcon')).toBeVisible()
  })
})
