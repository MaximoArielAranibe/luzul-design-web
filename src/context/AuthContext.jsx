// src/context/AuthContext.jsx
// Contexto global de autenticación — expone el usuario actual y helpers

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

/** @typedef {{ user: import("firebase/auth").User|null, loading: boolean, login: Function, logout: Function }} AuthContextValue */

const AuthContext = createContext(/** @type {AuthContextValue} */ (null));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // espera a que Firebase resuelva la sesión

  useEffect(() => {
    // Suscripción que Firebase mantiene en memoria; se limpia al desmontar
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Login con email/password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<import("firebase/auth").UserCredential>}
   */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /** Cierra sesión y redirige al home */
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Hook para consumir el contexto en cualquier componente */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};