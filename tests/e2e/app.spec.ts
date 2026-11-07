import { expect, test } from '@playwright/test'

test('displays the launch catalogue', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Upcoming launches' }),
  ).toBeVisible()
})

const booking = (overrides: Record<string, unknown> = {}) => ({
  id: 'booking-1',
  launchId: 'launch-1',
  customerId: 'customer-1',
  customerEmail: 'test.customer@astrobookings.local',
  rocketName: 'Test Falcon',
  seatCount: 2,
  totalPrice: 9998,
  launchPrice: 4999,
  status: 'confirmed',
  paymentStatus: 'completed',
  createdAt: '2026-11-07T18:29:32.421Z',
  updatedAt: '2026-11-07T18:29:32.421Z',
  ...overrides,
})

test.describe('booking history', () => {
  test('displays customer bookings', async ({ page }) => {
    await page.route('**/api/bookings/customer/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([booking()]),
      })
    })
    await page.goto('/bookings')

    await expect(page.getByText('booking-1')).toBeVisible()
    await expect(page.getByText('Test Falcon')).toBeVisible()
    await expect(page.getByText('confirmed')).toBeVisible()
    await expect(page.getByText('€9,998.00')).toBeVisible()
  })

  test('shows an empty state', async ({ page }) => {
    await page.route('**/api/bookings/customer/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    })
    await page.goto('/bookings')

    await expect(page.getByText('You do not have any bookings yet.')).toBeVisible()
  })

  test('offers retry after a history API error', async ({ page }) => {
    let requestCount = 0
    await page.route('**/api/bookings/customer/**', async (route) => {
      requestCount += 1
      if (requestCount === 1) {
        await route.fulfill({ status: 503, body: 'unavailable' })
        return
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([booking()]),
      })
    })
    await page.goto('/bookings')

    await expect(
      page.getByText('We could not load your bookings from the API.'),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('booking-1')).toBeVisible()
  })
})

test('shows a not-found state for an unknown route', async ({ page }) => {
  await page.goto('/unknown-route')

  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to launches' })).toBeVisible()
})
