// app/admin/layout.jsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  // Aquí envolvemos a todas las rutas hijas con ProtectedRoute
  return <ProtectedRoute role="admin">{children}</ProtectedRoute>;
}
