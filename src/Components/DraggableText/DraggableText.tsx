import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const DraggableText = (props: any) => {
    console.log('draggableText instance props', props);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.imageSourceData.prompt,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

export default DraggableText;
