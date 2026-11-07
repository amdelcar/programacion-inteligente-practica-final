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

const apiResponse = (body: unknown, status = 200) => ({
  status,
  contentType: 'application/json',
  body: JSON.stringify(body),
})

async function mockLaunches(page: Page, launches: unknown[]) {
  await page.route('**/api/launches', async (route) => {
    await route.fulfill(
      apiResponse({ value: launches, Count: launches.length }),
    )
  })
}

async function mockLaunchDetails(page: Page, availableSeats: number) {
  await page.route('**/api/launches/launch-1', async (route) => {
    await route.fulfill(
      apiResponse({ ...launch({ availableSeats }), bookedSeats: 10 - availableSeats }),
    )
  })
}

async function mockBooking(page: Page, body: unknown, status: number) {
  await page.route('**/api/bookings', async (route) => {
    await route.fulfill(apiResponse(body, status))
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

      await route.fulfill(apiResponse({ value: [launch()], Count: 1 }))
    })
    await page.goto('/')

    await expect(
      page.getByText('We could not load launches from the API.'),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('Test Falcon')).toBeVisible()
  })

  test('validates and submits a seat booking', async ({ page }) => {
    await mockLaunches(page, [launch({ availableSeats: 3 })])
    await mockLaunchDetails(page, 3)
    await mockBooking(
      page,
      {
        id: 'booking-1',
        status: 'pending',
        paymentStatus: 'pending',
        launchId: 'launch-1',
        seatCount: 2,
      },
      201,
    )
    await page.goto('/launches/launch-1')
    await expect(page.getByLabel('Number of seats')).toBeVisible()
    await page.getByLabel('Number of seats').fill('4')
    await page.getByRole('button', { name: 'Book seats' }).click()
    await expect(page.getByText('Only 3 seats are currently available.')).toBeVisible()
    await page.getByLabel('Number of seats').fill('2')
    await page.getByRole('button', { name: 'Book seats' }).click()
    await expect(page.getByText('Booking accepted')).toBeVisible()
    await expect(page.getByText('Status: pending')).toBeVisible()
  })

  test('shows an API availability rejection', async ({ page }) => {
    await mockLaunches(page, [launch({ availableSeats: 3 })])
    await mockLaunchDetails(page, 3)
    await mockBooking(
      page,
      { error: 'Insufficient seats available' },
      400,
    )
    await page.goto('/launches/launch-1')
    await page.getByLabel('Number of seats').fill('2')
    await page.getByRole('button', { name: 'Book seats' }).click()
    await expect(page.getByText('Insufficient seats available')).toBeVisible()
  })
})
