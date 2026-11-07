import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/app-layout'
import {
  BookingConfirmationPage,
  BookingFlowPage,
  NotFoundPage,
} from './pages/placeholder-pages'
import { BookingHistoryPage } from './pages/booking-history-page'
import { LaunchCataloguePage } from './pages/launch-catalogue-page'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<LaunchCataloguePage />} />
        <Route path="launches/:launchId" element={<BookingFlowPage />} />
        <Route path="bookings" element={<BookingHistoryPage />} />
        <Route
          path="bookings/:bookingId"
          element={<BookingConfirmationPage />}
        />
        <Route
          path="booking/confirmation"
          element={<BookingConfirmationPage />}
        />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/legacy" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
