import { useState, useEffect } from "react";

import { updateMediaTitle } from "../functions/media.service";

import "../styles/EditMediaModal.scss";
import QuickCategories from "./common/QuickCategories";

const EditMediaModal = ({ media, onClose }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (media) {
      setTitle(media.title);
    }
  }, [media]);

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      await updateMediaTitle(media.firestoreId, title.trim());

      onClose();
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el título.");
    }
  };

  if (!media) return null;

  return (
    <div className="edit-media-modal" onClick={onClose}>
      <div
        className="edit-media-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="edit-media-modal__header">
          <h2>Editar título</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </header>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribí un título..."
        />

        <QuickCategories
          categories={[
            "Decoración",
            "Luminaría",
            "Cocktelería",
            "XV",
            "Evento",
            "Carpas beduinas",
            "Fiesta",
            "Catering"
          ]}
          onSelect={setTitle}
        />

        <footer className="edit-media-modal__footer">
          <button onClick={onClose}>
            Cancelar
          </button>

          <button onClick={handleSave}>
            Guardar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditMediaModal;