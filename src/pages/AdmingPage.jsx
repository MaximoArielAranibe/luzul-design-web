// src/pages/AdminPage.jsx
// Panel de administración — solo accesible si hay sesión activa (ProtectedRoute)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaUploader from "../components/admin/MediaUploader";
import MediaList from "../components/admin/MediaList";
import logo from "../assets/logo-blanco.png";
import "../styles/pages/AdminPage.scss";

const TABS = [
  { id: "upload", label: "Subir contenido" },
  { id: "list", label: "Contenido publicado" },
];

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-page">

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="admin-sidebar">
        <Link to='/' className="admin-sidebar__logo">
          <img src={logo} alt="Luzul Design" />
        </Link>

        <nav className="admin-sidebar__nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-sidebar__item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__email">{user?.email}</p>
          <button className="btn-secondary admin-sidebar__logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <main className="admin-main">
        <div className="admin-main__inner">
          {activeTab === "upload" && <MediaUploader />}
          {activeTab === "list" && <MediaList />}
        </div>
      </main>

    </div>
  );
};

export default AdminPage;