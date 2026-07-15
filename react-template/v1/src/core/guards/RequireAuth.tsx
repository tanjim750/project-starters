import { Navigate } from "react-router-dom";

import { ROUTES } from "../routing/routes";
import type { PropsWithChildren } from "../types/react";

export function RequireAuth({ children }: PropsWithChildren) {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
}
