// src/components/ShowVideos.jsx

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import useMediaItems from "../hooks/useMediaItems";
import useDeleteMedia from "../hooks/useDeleteMedia";

import { useAuth } from "../context/AuthContext";

import AdminToolbar from "./AdminToolbar";
import UploadModal from "./admin/UploadModal";
import ManagerModal from "./admin/ManagerModal";
import EditMediaModal from "./EditMediaModal";

import "../styles/pages/ShowVideos.scss";



const ShowVideos = () => {
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  const { user } = useAuth();
  const { items: firestoreItems } = useMediaItems();
  const { deleteMedia } = useDeleteMedia();

  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(16);

  const [showUploader, setShowUploader] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);


  const media = firestoreItems.map((item) => ({
    id: item.id,
    firestoreId: item.id,
    preview: item.url,
    full: item.url,
    title: item.title,
    span: item.span || "normal",
    isVideo: item.type === "video",
  }));

  const visibleMedia = media.slice(0, visibleCount);

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) =>
              prev >= media.length ? prev : prev + 24
            );
          }
        },
        {
          rootMargin: "1200px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [media.length]
  );

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    const videos = media.filter((item) => item.isVideo);

    const current = videos[currentPreviewIndex];

    if (!current) return;

    const video = videoRefs.current[current.id];

    if (!video) return;

    video.currentTime = 0;

    video.play().catch(() => { });

    const timeout = setTimeout(() => {
      video.pause();

      setCurrentPreviewIndex((prev) =>
        prev + 1 >= videos.length ? 0 : prev + 1
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentPreviewIndex, media]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleHoverPlay = useCallback((id) => {
    videoRefs.current[id]?.play().catch(() => { });
  }, []);

  const handleHoverPause = useCallback((id) => {
    videoRefs.current[id]?.pause();
  }, []);

  return (
    <>
      <section className="videos-section">
        <h3 className="videos-section-text">
          Muestrario de nuestros <strong>trabajos</strong>
        </h3>

        {user && (
          <AdminToolbar
            onUpload={() => setShowUploader(true)}
            onManage={() => setShowManager(true)}
          />
        )}

        <div className="videos-container">
          {visibleMedia.map((mediaItem, index) => {
            const isLast = index === visibleMedia.length - 1;

            return (
              <article
                key={mediaItem.id}
                ref={isLast ? lastElementRef : null}
                className={`media-card ${mediaItem.span}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onMouseEnter={() =>
                  mediaItem.isVideo && handleHoverPlay(mediaItem.id)
                }
                onMouseLeave={() =>
                  mediaItem.isVideo && handleHoverPause(mediaItem.id)
                }
                onClick={() => setActiveVideo(mediaItem)}
              >
                {mediaItem.isVideo ? (
                  <video
                    ref={(el) => (videoRefs.current[mediaItem.id] = el)}
                    src={mediaItem.preview}
                    muted
                    playsInline
                    preload="metadata"
                    loop
                  />
                ) : (
                  <img
                    src={mediaItem.preview}
                    alt={mediaItem.title}
                    loading="lazy"
                  />
                )}

                <div className="media-overlay">
                  <h3>{mediaItem.title}</h3>
                </div>

                {user && (
                  <button
                    className="edit-media-btn"

                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMedia(mediaItem);
                    }}
                  >
                    ✏️
                  </button>
                )}


                {user && (

                  <button
                    className="delete-media-btn"
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (
                        !window.confirm(
                          "¿Seguro que querés eliminar este archivo?"
                        )
                      ) {
                        return;
                      }

                      await deleteMedia(mediaItem.firestoreId);
                    }}
                  >
                    🗑
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {activeVideo &&
        createPortal(
          <div
            className="video-modal"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="video-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Cerrar"
              >
                ✕
              </button>

              {activeVideo.isVideo ? (
                <video
                  key={activeVideo.full}
                  src={activeVideo.full}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={activeVideo.full}
                  alt={activeVideo.title}
                />
              )}
            </div>
          </div>,
          document.body
        )}

      {showUploader && (
        <UploadModal
          onClose={() => setShowUploader(false)}
        />
      )}

      {showManager && (
        <ManagerModal
          onClose={() => setShowManager(false)}
        />
      )}

      {editingMedia && (
        <EditMediaModal
          media={editingMedia}
          onClose={() => setEditingMedia(null)}
        />
      )}
    </>
  );
};

export default ShowVideos;