import { NavLink, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">ASTROBOOKINGS CLIENT</p>
          <h1>Plan your next journey</h1>
          <p className="intro">
            Explore missions and reserve seats through the AstroBookings API.
          </p>
        </div>
        <nav aria-label="Main navigation">
          <NavLink className="nav-button" to="/" end>
            Launches
          </NavLink>
          <NavLink className="nav-button" to="/bookings">
            My bookings
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
