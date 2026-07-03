// src/hooks/useMediaUpload.js
// Sube archivos a Cloudinary (unsigned upload) y guarda metadata en Firestore.

import { useState, useCallback } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const MAX_SIZE_MB = 200;

const validateFile = (file) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    return {
      ok: false,
      error:
        "Solo se admiten imágenes (JPG, PNG, WebP) y videos (MP4, MOV, WebM).",
    };
  }

  const sizeMB = file.size / (1024 * 1024);

  if (sizeMB > MAX_SIZE_MB) {
    return {
      ok: false,
      error: `El archivo supera los ${MAX_SIZE_MB} MB permitidos.`,
    };
  }

  return { ok: true };
};

console.log("Cloud:", CLOUD_NAME);
console.log("Preset:", UPLOAD_PRESET);

const useMediaUpload = () => {
  const [uploadState, setUploadState] = useState({
    progress: 0,
    uploading: false,
    error: null,
    url: null,
  });

  const resetUpload = useCallback(() => {
    setUploadState({
      progress: 0,
      uploading: false,
      error: null,
      url: null,
    });
  }, []);

  const uploadFile = useCallback(async (file, meta) => {
    const validation = validateFile(file);

    if (!validation.ok) {
      setUploadState((s) => ({
        ...s,
        error: validation.error,
      }));
      return;
    }

    setUploadState({
      progress: 0,
      uploading: true,
      error: null,
      url: null,
    });

    try {
      const isVideo = file.type.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";

      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

      console.log("URL:", uploadUrl);

      const formData = new FormData();

      formData.append("file", file);

      // MUY IMPORTANTE
      formData.append("upload_preset", UPLOAD_PRESET);

      formData.append(
        "folder",
        isVideo
          ? "luzuldesign/videos"
          : "luzuldesign/images"
      );

      const url = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100);

            setUploadState((s) => ({
              ...s,
              progress: pct,
            }));
          }
        });

        xhr.onload = () => {
          console.log("STATUS:", xhr.status);
          console.log("RESPUESTA:", xhr.responseText);

          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.error?.message || "Error Cloudinary"));
            } catch {
              reject(new Error(xhr.responseText));
            }
          }
        };

        xhr.onerror = () => reject(new Error("Error de red"));

        xhr.open("POST", uploadUrl);

        xhr.send(formData);
      });

      await addDoc(collection(db, "media"), {
        url,
        title: meta.title.trim(),
        span: meta.span || "normal",
        type: isVideo ? "video" : "image",
        createdAt: serverTimestamp(),
      });

      setUploadState({
        progress: 100,
        uploading: false,
        error: null,
        url,
      });
    } catch (err) {
      console.error("[useMediaUpload]", err);

      setUploadState({
        progress: 0,
        uploading: false,
        error: err.message,
        url: null,
      });
    }
  }, []);

  return {
    uploadFile,
    uploadState,
    resetUpload,
  };
};

export default useMediaUpload;