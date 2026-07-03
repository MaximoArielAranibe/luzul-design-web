// src/components/admin/ProtectedRoute.jsx
// Guarda las rutas admin — redirige a /login si no hay sesión activa

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras Firebase verifica la sesión persistida mostramos un spinner
  if (loading) {
    return (
      <div className="auth-loading">
        <span className="auth-loading__spinner" />
      </div>
    );
  }

  // Sin sesión → redirige preservando la ruta para volver después del login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;