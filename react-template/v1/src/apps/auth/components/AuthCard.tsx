import type { PropsWithChildren } from "../../../core/types/react";

export function AuthCard({ children }: PropsWithChildren) {
  return <div className="auth-card">{children}</div>;
}
