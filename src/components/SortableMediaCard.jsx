import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableMediaCard = ({
  id,
  disabled = false,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef
  } = useSortable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
    width: "100%",
    height: "100%",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="sortable-media"
    >
      {React.cloneElement(children, {
        dragListeners: listeners,
        dragAttributes: attributes,
        dragRef: setActivatorNodeRef,
      })}
    </div>
  );
};

export default SortableMediaCard;