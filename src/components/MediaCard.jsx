import { memo } from "react";

const MediaCard = ({
  media,
  index,
  isLast,
  lastElementRef,
  videoRefs,
  handleHoverPlay,
  handleHoverPause,
  onOpen,
  onEdit,
  onDelete,
  user,
  isSorting
}) => {
  return (
    <article
      ref={isLast ? lastElementRef : null}
      className={`media-card ${media.span}`}
      style={{ animationDelay: `${index * 0.12}s` }}
      onMouseEnter={() =>
        media.isVideo && handleHoverPlay(media.id)
      }
      onMouseLeave={() =>
        media.isVideo && handleHoverPause(media.id)
      }
      onClick={() => {
        if (!isSorting) {
          onOpen(media)
        }
      }
      }
    >
      {media.isVideo ? (
        <video
          ref={(el) => (videoRefs.current[media.id] = el)}
          src={media.preview}
          muted
          playsInline
          preload="metadata"
          loop
        />
      ) : (
        <img
          src={media.preview}
          alt={media.title}
          loading="lazy"
        />
      )}

      <div className="media-overlay">
        <h3>{media.title}</h3>
      </div>

      {user && (
        <button
          className="edit-media-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(media);
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

            await onDelete(media.firestoreId);
          }}
        >
          🗑
        </button>
      )}
    </article>
  );
};

export default memo(MediaCard);