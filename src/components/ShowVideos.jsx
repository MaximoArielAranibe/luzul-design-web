import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "../styles/pages/ShowVideos.scss";

const videos = [
  {
    id: 1,
    preview: "/luzul-video-preview-1.mp4",
    full: "/luzul-video-1.mp4",
    title: "Brand Intro",
    span: "large",
    isVideo: true
  },
  {
    id: 2,
    preview: "/luzul-video-preview-2.mp4",
    full: "/luzul-video-2.mp4",
    title: "Ambientación Evento",
    span: "normal",
    isVideo: true
  },
  {
    id: 3,
    preview: "/luzul-video-preview-3.mp4",
    full: "/luzul-video-3.mp4",
    title: "Montaje Escenografía",
    span: "tall",
    isVideo: true
  },
  {
    id: 4,
    preview: "/luzul-video-preview-4.mp4",
    full: "/luzul-video-4.mp4",
    title: "Detalle Técnico",
    span: "normal",
    isVideo: true
  },
  {
    id: 5,
    preview: "/nuevas-3.jpeg",
    title: "Imagen",
    span: "normal",
    isVideo: false
  }
];

const ShowVideos = () => {
  const videoRefs = useRef({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  /* Scroll lock */
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
  }, [activeVideo]);

  /* Preview secuencial */
  useEffect(() => {
    const videoList = videos.filter((v) => v.isVideo);
    const currentVideoId = videoList[currentPreviewIndex]?.id;

    const video = videoRefs.current[currentVideoId];

    if (!video) return;

    video.currentTime = 0;

    video.play().catch(() => { });

    const timeout = setTimeout(() => {
      video.pause();

      setCurrentPreviewIndex((prev) => {
        if (prev + 1 >= videoList.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentPreviewIndex]);

  /* ESC close */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleHoverPlay = useCallback((id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    video.play().catch(() => { });
  }, []);

  const handleHoverPause = useCallback((id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    video.pause();
  }, []);

  return (
    <>
      <section className="videos-section">
        <div className="videos-container">
          {videos.map((video, index) => {
            const { id, preview, title, isVideo, span } = video;

            return (
              <article
                key={id}
                className={`media-card ${span}`}
                style={{ animationDelay: `${index * 0.12}s`, gridArea: `v${index}` }}
                onMouseEnter={() => isVideo && handleHoverPlay(id)}
                onMouseLeave={() => isVideo && handleHoverPause(id)}
                onClick={() => setActiveVideo(video)}
              >
                {isVideo ? (
                  <video
                    ref={(el) => (videoRefs.current[id] = el)}
                    src={preview}
                    muted
                    playsInline
                    preload="metadata"
                    loop
                    loading="lazy"
                  />
                ) : (
                  <img src={preview} alt={title} loading="lazy" />
                )}

                <div className="media-overlay">
                  <h3>{title}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activeVideo &&
        createPortal(
          <div className="video-modal" onClick={() => setActiveVideo(null)}>
            <div
              className="video-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setActiveVideo(null)}
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
                <img src={activeVideo.preview} alt={activeVideo.title} />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ShowVideos;