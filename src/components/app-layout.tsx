import { NavLink, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">ASTROBOOKINGS CLIENT</p>
          <h1>Choose your next launch</h1>
          <p className="intro">
            Explore missions and reserve seats through the AstroBookings API.
          </p>
        </div>
        <nav aria-label="Main navigation">
          <NavLink to="/">Launches</NavLink>
          <NavLink to="/bookings">My bookings</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
