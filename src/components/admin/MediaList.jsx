// src/components/admin/MediaList.jsx
// Lista el contenido subido con opción de eliminar — suscripción Firestore en tiempo real

import React, { useState } from "react";
import useMediaItems from "../../hooks/useMediaItems";

const MediaList = () => {
  const { items, loading, error, deleteItem } = useMediaItems();
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Eliminar "${item.title}"? Esta acción no se puede deshacer.`)) return;

    setDeletingId(item.id);
    setDeleteError("");

    try {
      await deleteItem(item);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="media-list__status">Cargando contenido…</p>;
  }

  if (error) {
    return <p className="media-list__status media-list__status--error">{error}</p>;
  }

  if (!items.length) {
    return <p className="media-list__status">Todavía no hay contenido subido.</p>;
  }

  return (
    <div className="media-list">
      <h2 className="media-list__title">Contenido publicado ({items.length})</h2>

      {deleteError && (
        <div className="upload-error" role="alert">{deleteError}</div>
      )}

      <div className="media-list__grid">
        {items.map((item) => (
          <div key={item.id} className="media-list__card">

            {/* Preview */}
            <div className="media-list__thumb">
              {item.type === "video" ? (
                <video src={item.url} muted playsInline preload="metadata" />
              ) : (
                <img src={item.url} alt={item.title} loading="lazy" />
              )}
              <span className={`media-list__badge ${item.type}`}>
                {item.type === "video" ? "🎬 Video" : "🖼️ Foto"}
              </span>
            </div>

            {/* Info */}
            <div className="media-list__info">
              <p className="media-list__item-title">{item.title}</p>
              <span className="media-list__span">Span: {item.span}</span>
            </div>

            {/* Eliminar */}
            <button
              className="media-list__delete"
              onClick={() => handleDelete(item)}
              disabled={deletingId === item.id}
              aria-label={`Eliminar ${item.title}`}
            >
              {deletingId === item.id ? "…" : "🗑️"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaList;