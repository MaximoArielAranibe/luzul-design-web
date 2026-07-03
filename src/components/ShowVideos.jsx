// src/components/ShowVideos.jsx
// Muestrario — combina videos/fotos locales + contenido subido desde el panel admin (Firestore)

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import useMediaItems from "../hooks/useMediaItems";
import "../styles/pages/ShowVideos.scss";
import { useAuth } from "../context/AuthContext";
import AdminToolbar from "./AdminToolbar";
import UploadModal from "./admin/UploadModal";
import useDeleteMedia from "../hooks/useDeleteMedia";


const ShowVideos = () => {
  const videoRefs = useRef({});
  const observerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const { items: firestoreItems } = useMediaItems();

  const { user } = useAuth();

  const [showUploader, setShowUploader] = useState(false);
  const [showManager, setShowManager] = useState(false);


  const media = firestoreItems.map((item) => ({
    id: item.id,
    firestoreId: item.id,
    preview: item.url,
    full: item.url,
    title: item.title,
    span: item.span || "normal",
    isVideo: item.type === "video",
  }));

  const videos = media;
  const visibleVideos = videos.slice(0, visibleCount);
  const { deleteMedia } = useDeleteMedia();

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => prev >= videos.length ? prev : prev + 12);
          }
        },
        { rootMargin: "200px" }
      );
      if (node) observerRef.current.observe(node);
    },
    [videos.length]
  );

  useEffect(() => { document.body.style.overflow = activeVideo ? "hidden" : ""; }, [activeVideo]);

  useEffect(() => {
    const videoList = videos.filter((v) => v.isVideo);
    const currentVideoId = videoList[currentPreviewIndex]?.id;
    const video = videoRefs.current[currentVideoId];
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => { });
    const timeout = setTimeout(() => {
      video.pause();
      setCurrentPreviewIndex((prev) => prev + 1 >= videoList.length ? 0 : prev + 1);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [currentPreviewIndex, videos]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setActiveVideo(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleHoverPlay = useCallback((id) => { videoRefs.current[id]?.play().catch(() => { }); }, []);
  const handleHoverPause = useCallback((id) => { videoRefs.current[id]?.pause(); }, []);

  const testCloudinary = async () => {
    const fd = new FormData();

    fd.append("file", document.querySelector("#img").files[0]);
    fd.append("upload_preset", "luzuldesign");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drckxil9/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    console.log(await res.text());
  };

  return (
    <>
      <input id="img" type="file" />

      <button onClick={testCloudinary}>
        Probar
      </button>
      <section className="videos-section">
        <h3 className="videos-section-text">
          Muestrario de nuestros<strong> trabajos</strong>
        </h3>

        {user && (
          <AdminToolbar
            onUpload={() => setShowUploader(true)}

            onManage={() => setShowManager(true)}
          />
        )}

        <div className="videos-container">
          {visibleVideos.map((video, index) => {
            const { id, preview, title, isVideo, span } = video;
            const isLast = index === visibleVideos.length - 1;
            return (
              <article
                key={id}
                ref={isLast ? lastElementRef : null}
                className={`media-card ${span}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onMouseEnter={() => isVideo && handleHoverPlay(id)}
                onMouseLeave={() => isVideo && handleHoverPause(id)}
                onClick={() => setActiveVideo(video)}
              >
                {isVideo ? (
                  <video ref={(el) => (videoRefs.current[id] = el)} src={preview} muted playsInline preload="metadata" loop />
                ) : (
                  <img src={preview} alt={title} loading="lazy" />
                )}
                <div className="media-overlay"><h3>{title}</h3></div>
                {user && (
                  <button
                    className="delete-media-btn"
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (!window.confirm("¿Eliminar este archivo?")) return;

                      switch (video.source) {
                        case "firestore":
                          await deleteMedia(video.firestoreId);
                          break;

                        case "json":
                          alert(
                            `Más adelante vamos a borrar la imagen ${video.jsonId} del media.json`
                          );
                          break;

                        case "base":
                          alert(
                            "Esta imagen pertenece al proyecto y todavía no implementamos su borrado."
                          );
                          break;

                        default:
                          break;
                      }
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

      {activeVideo && createPortal(
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveVideo(null)} aria-label="Cerrar">✕</button>
            {activeVideo.isVideo ? (
              <video key={activeVideo.full} src={activeVideo.full} controls autoPlay playsInline />
            ) : (
              <img src={activeVideo.full || activeVideo.preview} alt={activeVideo.title} />
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
    </>
  );
};

export default ShowVideos;