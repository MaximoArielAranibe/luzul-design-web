// src/components/admin/ManagerModal.jsx

import MediaList from "./MediaList";
import "./ManagerModal.scss";

const ManagerModal = ({ onClose }) => {
  return (
    <div className="manager-modal" onClick={onClose}>
      <div
        className="manager-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="manager-modal__header">
          <div>
            <h2>Administrar contenido</h2>
            <p>
              Desde aquí podés eliminar las imágenes y videos publicados.
            </p>
          </div>

          <button
            className="manager-modal__close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <div className="manager-modal__body">
          <MediaList />
        </div>
      </div>
    </div>
  );
};

export default ManagerModal;