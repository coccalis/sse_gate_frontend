import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../../shared/auth/useCurrentUser";

export default function RequireAdmin() {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) return <div aria-busy="true" className="min-h-40" />;
  if (user?.role !== "admin") return <Navigate to="/home" replace />;
  return <Outlet />;
}
