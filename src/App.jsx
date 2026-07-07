// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './utils/ScrollToTop';

import Home from './components/Home';
import ShowVideos from './components/ShowVideos';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdmingPage';
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin protegido — sin Navbar ni WhatsApp */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas públicas con layout completo */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <WhatsAppButton />
                <Home />
              </>
            }
          />
          <Route
            path="/muestrario"
            element={
              <>
                <Navbar />
                <WhatsAppButton />
                <ShowVideos />
              </>
            }
          />
        </Routes>

        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#181818",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "12px",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;