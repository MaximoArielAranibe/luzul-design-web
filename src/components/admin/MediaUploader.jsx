// src/components/admin/MediaUploader.jsx
// Sub-componente: formulario de carga de foto/video con preview y barra de progreso

import React, { useState, useRef, useCallback } from "react";
import useMediaUpload from "../../hooks/useMediaUpload";

const SPAN_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Ancho (wide)" },
  { value: "tall", label: "Alto (tall)" },
];

const ACCEPTED = "image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm";

const MediaUploader = () => {
  const { uploadFile, uploadState, resetUpload } = useMediaUpload();

  const [title, setTitle] = useState("");
  const [span, setSpan] = useState("normal");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const inputRef = useRef(null);

  /* Limpia todo el estado del formulario */
  const resetForm = useCallback(() => {
    setTitle("");
    setSpan("normal");
    setFile(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setTitleError("");
    setFileError("");
    resetUpload();
  }, [resetUpload]);

  const handleFileSelect = useCallback((selected) => {
    if (!selected) return;
    setFileError("");

    // Validación de tipo rápida antes de pasar al hook
    const isImage = selected.type.startsWith("image/");
    const isVideo = selected.type.startsWith("video/");
    if (!isImage && !isVideo) {
      setFileError("Solo se admiten imágenes (JPG, PNG, WebP) y videos (MP4, MOV, WebM).");
      return;
    }

    setFile(selected);

    // Previsualización local — se libera memoria al resetear
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selected));
  }, [preview]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileSelect(dropped);
  }, [handleFileSelect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!title.trim()) {
      setTitleError("El título es obligatorio.");
      valid = false;
    }
    if (!file) {
      setFileError("Seleccioná un archivo.");
      valid = false;
    }
    if (!valid) return;

    await uploadFile(file, { title, span });

    // Si tuvo éxito limpiamos el form tras 2s para que el usuario vea el mensaje
    if (!uploadState.error) {
      setTimeout(resetForm, 2000);
    }
  };

  const isUploading = uploadState.uploading;
  const isDone = uploadState.url && !uploadState.uploading;

  return (
    <form className="media-uploader" onSubmit={handleSubmit} noValidate>

      <h2 className="media-uploader__title">Subir contenido</h2>

      {/* ── Drop zone ──────────────────────────────── */}
      <div
        className={`drop-zone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Zona de carga de archivos"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect(e.target.files?.[0])}
          disabled={isUploading}
        />

        {preview ? (
          <div className="drop-zone__preview">
            {file?.type.startsWith("video/") ? (
              <video src={preview} muted playsInline controls />
            ) : (
              <img src={preview} alt="Preview" />
            )}
            {!isUploading && (
              <button
                type="button"
                className="drop-zone__remove"
                onClick={(e) => { e.stopPropagation(); resetForm(); }}
                aria-label="Quitar archivo"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <div className="drop-zone__placeholder">
            <span className="drop-zone__icon">📁</span>
            <p>Arrastrá o <strong>seleccioná</strong> una foto / video</p>
            <small>JPG · PNG · WebP · MP4 · MOV · WebM — máx 200 MB</small>
          </div>
        )}
      </div>

      {fileError && <span className="field-error">{fileError}</span>}

      {/* ── Título ─────────────────────────────────── */}
      <div className={`form-field ${titleError ? "has-error" : ""}`}>
        <label htmlFor="media-title">Título</label>
        <input
          id="media-title"
          type="text"
          placeholder="Ej: Decoración XV años"
          value={title}
          maxLength={80}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError("");
          }}
          disabled={isUploading}
        />
        {titleError && <span className="field-error">{titleError}</span>}
      </div>

      {/* ── Span / Layout ──────────────────────────── */}
      <div className="form-field">
        <label>Tamaño en grilla</label>
        <div className="span-options">
          {SPAN_OPTIONS.map((opt) => (
            <label key={opt.value} className={`span-option ${span === opt.value ? "active" : ""}`}>
              <input
                type="radio"
                name="span"
                value={opt.value}
                checked={span === opt.value}
                onChange={() => setSpan(opt.value)}
                disabled={isUploading}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* ── Progreso ───────────────────────────────── */}
      {isUploading && (
        <div className="upload-progress">
          <div
            className="upload-progress__bar"
            style={{ width: `${uploadState.progress}%` }}
          />
          <span>{uploadState.progress}%</span>
        </div>
      )}

      {/* ── Error servidor ─────────────────────────── */}
      {uploadState.error && (
        <div className="upload-error" role="alert">
          {uploadState.error}
        </div>
      )}

      {/* ── Éxito ──────────────────────────────────── */}
      {isDone && (
        <div className="upload-success" role="status">
          ✅ ¡Archivo subido con éxito!
        </div>
      )}

      {/* ── Botones ────────────────────────────────── */}
      <div className="media-uploader__actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={resetForm}
          disabled={isUploading}
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isUploading || !file}
        >
          {isUploading ? "Subiendo…" : "Subir"}
        </button>
      </div>

    </form>
  );
};

export default MediaUploader;