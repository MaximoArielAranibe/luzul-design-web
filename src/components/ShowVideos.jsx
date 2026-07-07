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
import MediaCard from "./MediaCard";
import SortableMedia from "./SortableMediaCard";
import "../styles/pages/ShowVideos.scss";

import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import toast from "react-hot-toast";

import useMediaSort from "../hooks/useMediaSort";



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
  const [isSorting, setIsSorting] = useState(false);
  const [sortedMedia, setSortedMedia] = useState([]);
  const [savingOrder, setSavingOrder] = useState(false);

  const visibleMedia = sortedMedia.slice(0, visibleCount);

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) =>
              prev >= sortedMedia.length ? prev : prev + 24
            );
          }
        },
        {
          rootMargin: "1200px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [sortedMedia.length]
  );

  const handleSaveSorting = async () => {
    try {
      setSavingOrder(true);

      await saveOrder(sortedMedia);

      toast.success("Orden guardado correctamente");

      setIsSorting(false);
    } catch (err) {
      console.error(err);

      toast.error("No se pudo guardar el orden");
    } finally {
      setSavingOrder(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    const videos = sortedMedia.filter((item) => item.isVideo);

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
  }, [currentPreviewIndex, sortedMedia]);


  useEffect(() => {
    setSortedMedia(
      firestoreItems.map((item) => ({
        id: item.id,
        firestoreId: item.id,
        preview: item.url,
        full: item.url,
        title: item.title,
        span: item.span || "normal",
        isVideo: item.type === "video",
        order: item.order,
      }))
    );
  }, [firestoreItems]);

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

  const { saveOrder } = useMediaSort();

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = sortedMedia.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = sortedMedia.findIndex(
      (item) => item.id === over.id
    );

    setSortedMedia(
      arrayMove(sortedMedia, oldIndex, newIndex)
    );
  };

  const sortingSensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

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
            isSorting={isSorting}
            onToggleSorting={setIsSorting}
            onSaveSorting={handleSaveSorting}
            savingOrder={savingOrder}
          />
        )}

        <DndContext
        sensors={isSorting ? sortingSensors : undefined}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={visibleMedia.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="videos-container">
              {visibleMedia.map((mediaItem, index) => {
                const isLast = index === visibleMedia.length - 1;

                return (
                  <SortableMedia
                    key={mediaItem.id}
                    id={mediaItem.id}
                    disabled={!isSorting}
                  >
                    <MediaCard
                      media={mediaItem}
                      index={index}
                      isLast={isLast}
                      lastElementRef={lastElementRef}
                      videoRefs={videoRefs}
                      handleHoverPlay={handleHoverPlay}
                      handleHoverPause={handleHoverPause}
                      onOpen={setActiveVideo}
                      onEdit={setEditingMedia}
                      onDelete={deleteMedia}
                      user={user}
                      isSorting={isSorting}
                    />
                  </SortableMedia>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
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