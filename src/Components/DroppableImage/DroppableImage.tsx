import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableImage = (props: any) => {
    console.log('droppable image props: ', props);
    const trueProps = props.children.props['data-imageSourceData'];
    const { isOver, setNodeRef } = useDroppable({
        id: trueProps.prompt
    })

    const style = {
        color: isOver ? 'green' : undefined,
        boxShadow: isOver ? '2px 2px #007aaf' : undefined,
        border: 'solid 3px black',
        width: 'fit-content'
    };

    return (
        <div ref={setNodeRef} style={style} id={trueProps.prompt}>
            {props.children}
        </div>
    )
}

export default DroppableImage;