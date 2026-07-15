import { NavLink, Outlet } from "react-router-dom";

import { APP_NAME } from "../../core/constants/app";
import { ROUTES } from "../../core/routing/routes";

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">{APP_NAME}</div>
        <nav className="nav">
          <NavLink to={ROUTES.dashboard}>Dashboard</NavLink>
          <NavLink to={ROUTES.reports}>Reports</NavLink>
          <NavLink to={ROUTES.login}>Login</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
