import MediaUploader from "./MediaUploader";
import "../../styles/UploadModal.scss";

const UploadModal = ({ onClose }) => {
  return (
    <div className="upload-modal" onClick={onClose}>
      <div
        className="upload-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="upload-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <MediaUploader />
      </div>
    </div>
  );
};

export default UploadModal;