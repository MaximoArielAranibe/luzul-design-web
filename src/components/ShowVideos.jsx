import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "../styles/pages/ShowVideos.scss";

/* ============================
   GENERADOR DE IMÁGENES
============================ */

const generateImages = (startId = 9) => {
  const totalImages = 42;

  return Array.from({ length: totalImages }, (_, i) => {
    const id = startId + i;
    const index = i + 1;

    const fileNumber = String(index).padStart(2, "0"); // 👈 CLAVE

    return {
      id,
      preview: `/images/thumbs/foto${fileNumber}.webp`,
      full: `/images/full/foto${fileNumber}.webp`,
      title: `Trabajo ${index}`,
      span: "normal",
      isVideo: false
    };
  });
};

/* ============================
   TUS VIDEOS ORIGINALES
============================ */

const baseVideos = [
  {
    id: 1,
    preview: "/luzul-video-1.mp4",
    full: "/luzul-video-1.mp4",
    title: "Brand Intro",
    span: "normal",
    isVideo: true
  },
  {
    id: 2,
    preview: "/luzul-video-2.mp4",
    full: "/luzul-video-2.mp4",
    title: "Ambientación Evento",
    span: "normal",
    isVideo: true
  },
  {
    id: 3,
    preview: "/luzul-video-3.mp4",
    full: "/luzul-video-3.mp4",
    title: "Montaje Escenografía",
    span: "tall",
    isVideo: true
  },
  {
    id: 4,
    preview: "/nuevas-3.jpeg",
    title: "XV",
    span: "normal",
    isVideo: false
  },
  {
    id: 5,
    preview: "/flores-3.jpg",
    title: "Decoración flores",
    span: "normal",
    isVideo: false
  },
  {
    id: 6,
    preview: "/luzul-sillones-blancos.jpeg",
    title: "Sillones Blancos",
    span: "normal",
    isVideo: false
  },
  {
    id: 7,
    preview: "/flores-2.jpg",
    title: "Decoración Flores",
    span: "normal",
    isVideo: false
  },
  {
    id: 8,
    preview: "/luzul-evento-xv.jpeg",
    title: "XV",
    span: "normal",
    isVideo: false
  }
];

/* ============================
   DATA FINAL
============================ */

const videos = [
  ...baseVideos,
  ...generateImages(9)
];

/* ============================
   COMPONENTE
============================ */

const ShowVideos = () => {
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleVideos = videos.slice(0, visibleCount);

  /* ============================
     INFINITE SCROLL
  ============================ */

  const lastElementRef = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= videos.length) return prev;
            return prev + 12;
          });
        }
      },
      { rootMargin: "200px" }
    );

    if (node) observerRef.current.observe(node);
  }, []);

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
    video.play().catch(() => {});

    const timeout = setTimeout(() => {
      video.pause();
      setCurrentPreviewIndex((prev) =>
        prev + 1 >= videoList.length ? 0 : prev + 1
      );
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
    video.play().catch(() => {});
  }, []);

  const handleHoverPause = useCallback((id) => {
    const video = videoRefs.current[id];
    if (!video) return;
    video.pause();
  }, []);

  return (
    <>
      <section className="videos-section">
        <h3 className="videos-section-text">
          Muestrario de <strong>nuestros trabajos</strong>
        </h3>

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
                  <video
                    ref={(el) => (videoRefs.current[id] = el)}
                    src={preview}
                    muted
                    playsInline
                    preload="metadata"
                    loop
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
                <img
                  src={activeVideo.full || activeVideo.preview}
                  alt={activeVideo.title}
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ShowVideos;