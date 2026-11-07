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

  test.describe('booking confirmation detail', () => {
    test('displays booking details and returns to history', async ({ page }) => {
      await page.route('**/api/bookings/booking-1', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(booking()),
        })
      })
      await page.goto('/bookings/booking-1')

      await expect(page.getByRole('heading', { name: 'Test Falcon' })).toBeVisible()
      await expect(
        page.getByRole('row', { name: 'Booking ID booking-1' }),
      ).toBeVisible()
      await expect(page.getByText('completed')).toBeVisible()
      await expect(page.getByText('2', { exact: true })).toBeVisible()
      await expect(page.getByText('€9,998.00')).toBeVisible()
      await expect(page.getByText('Nov 7, 2026')).toHaveCount(2)

      await page.getByRole('link', { name: 'Back to my bookings' }).click()
      await expect(page).toHaveURL(/\/bookings$/)
    })

    test('offers retry after a detail API error', async ({ page }) => {
      let requestCount = 0
      await page.route('**/api/bookings/booking-2', async (route) => {
        requestCount += 1
        if (requestCount === 1) {
          await route.fulfill({ status: 503, body: 'unavailable' })
          return
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(booking({ id: 'booking-2' })),
        })
      })
      await page.goto('/bookings/booking-2')

      await expect(
        page.getByText('We could not load this booking from the API.'),
      ).toBeVisible()
      await page.getByRole('button', { name: 'Try again' }).click()
      await expect(
        page.getByRole('row', { name: 'Booking ID booking-2' }),
      ).toBeVisible()
    })
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
