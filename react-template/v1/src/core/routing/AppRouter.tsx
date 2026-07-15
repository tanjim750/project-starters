import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../../apps/auth/pages/LoginPage";
import { DashboardPage } from "../../apps/dashboard/pages/DashboardPage";
import { ReportsPage } from "../../apps/reports/pages/ReportsPage";
import { AppLayout } from "../../shared/layouts/AppLayout";
import { ROUTES } from "./routes";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={ROUTES.dashboard} replace />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.reports} element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}
