// src/pages/LoginPage.jsx
// Página de autenticación en /login — solo para admins

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-blanco.png";
import "../styles/pages/LoginPage.scss";

// ─── Validaciones ─────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (email, password) => {
  const errors = {};
  if (!email.trim()) errors.email = "El email es obligatorio.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Email inválido.";
  if (!password) errors.password = "La contraseña es obligatoria.";
  else if (password.length < 6) errors.password = "Mínimo 6 caracteres.";
  return errors;
};

// Mapea códigos de Firebase a mensajes amigables en español
const friendlyError = (code) => {
  const map = {
    "auth/user-not-found": "No existe una cuenta con ese email.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-credential": "Credenciales inválidas.",
    "auth/too-many-requests": "Demasiados intentos. Esperá unos minutos.",
    "auth/network-request-failed": "Sin conexión. Verificá tu red.",
  };
  return map[code] || "Error al iniciar sesión. Intentá de nuevo.";
};

// ─── Componente ───────────────────────────────────────────────────────────────

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ruta a la que redirigir tras login (preservada por ProtectedRoute)
  const from = location.state?.from?.pathname || "/admin";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Si ya está autenticado, redirige directo
  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpia el error del campo al editar
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form.email, form.password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-card__logo">
          <img src={logo} alt="Luzul Design" />
        </div>

        <h1 className="login-card__title">Panel Admin</h1>
        <p className="login-card__subtitle">Acceso restringido</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className={`login-form__field ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@luzuldesign.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && (
              <span className="login-form__error">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={`login-form__field ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Contraseña</label>
            <div className="login-form__password-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="login-form__eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <span className="login-form__error">{errors.password}</span>
            )}
          </div>

          {/* Error servidor */}
          {serverError && (
            <div className="login-form__server-error" role="alert">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary login-form__submit"
            disabled={loading}
          >
            {loading ? <span className="btn-spinner" /> : "Ingresar"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;