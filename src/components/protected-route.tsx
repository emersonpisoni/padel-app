import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../lib/auth/token";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = getAccessToken();
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
}
