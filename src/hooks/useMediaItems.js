// src/hooks/useMediaItems.js
// Escucha en tiempo real la colección "media" de Firestore.
// Sin Storage — la eliminación solo borra el doc de Firestore.
// (Borrar el asset de Cloudinary requiere signed request desde backend;
//  en el plan gratuito se puede hacer desde el dashboard de Cloudinary manualmente.)

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * @typedef {Object} MediaItem
 * @property {string} id
 * @property {string} url        URL pública de Cloudinary
 * @property {string} title
 * @property {'normal'|'wide'|'tall'} span
 * @property {'image'|'video'} type
 */

const useMediaItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "media"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(docs);
        setLoading(false);
      },
      (err) => {
        console.error("[useMediaItems]", err);
        setError("No se pudo cargar el contenido.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  /**
   * Elimina el documento de Firestore.
   * Nota: el asset en Cloudinary queda — se puede borrar desde el dashboard
   * o implementar una Cloud Function para hacerlo automáticamente.
   * @param {MediaItem} item
   */
  const deleteItem = async (item) => {
    try {
      await deleteDoc(doc(db, "media", item.id));
    } catch (err) {
      console.error("[useMediaItems] deleteItem:", err);
      throw new Error("No se pudo eliminar el archivo. Intentá de nuevo.");
    }
  };

  return { items, loading, error, deleteItem };
};

export default useMediaItems;