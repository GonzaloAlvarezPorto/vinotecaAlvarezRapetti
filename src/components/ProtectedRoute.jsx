"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import VinotecaContext from "@/context/VinotecaContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loadingUser } = useContext(VinotecaContext);
  const router = useRouter();

  // Hook siempre se ejecuta
  useEffect(() => {
    if (!loadingUser) {
      if (!user) {
        router.push("/login");
      } else if (role && user.role !== role) {
        router.push("/"); // si no tiene el rol, va a "/"
      }
    }
  }, [user, role, loadingUser, router]);

  // Mientas se carga el usuario, no renderizamos
  if (loadingUser || !user) return null;

  return <>{children}</>;
}
