import { CSSProperties, useState } from "react"
import { Image, Point, Size } from "../../store/BaseTypes"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppActions } from "../../hooks/useAppActions"
import { useDragAndResize } from "../../hooks/useDragAndDrop"

type ImageObjectProps = {
    imageObject: Image,
    scale?: number,
    containerRef: any,
    isSlideCollection: boolean,
}

function ImageObject({imageObject, scale = 1, isSlideCollection, containerRef}: ImageObjectProps) {
    const selectionObject = useAppSelector((editor => editor.selectionObject))
    const {updatePosition, updateSize, updateText} = useAppActions()
    const isSelected = imageObject.id == selectionObject.selectedObjectId
    
    const { position, size, isDragging, handleMouseDownMove, handleMouseDownResize } = useDragAndResize({
        initialPosition: imageObject.pos,
        initialSize: imageObject.size,
        scale,
        containerRef,
        onUpdatePosition: updatePosition,
        onUpdateSize: updateSize,
    })

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        cursor: isDragging ? "grabbing" : "grab",
        border: isSelected ? "1px solid #0b57d0" : "none",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const handleStyles: CSSProperties = {
        position: "absolute",
        width: "15px",
        height: "15px",
        backgroundColor: "#0b57d0",
        zIndex: 10,
    }

    const contentStyles: CSSProperties = {
        width: "100%",
        height: "100%",
    }

    const handles = [
        { direction: "top-left", style: { top: "-5px", left: "-5px", cursor: "nwse-resize" } },
        { direction: "top-right", style: { top: "-5px", right: "-5px", cursor: "nesw-resize" } },
        { direction: "bottom-left", style: { bottom: "-5px", left: "-5px", cursor: "nesw-resize" } },
        { direction: "bottom-right", style: { bottom: "-5px", right: "-5px", cursor: "nwse-resize" } },
        { direction: "top", style: { top: "-5px", left: "50%", transform: "translateX(-50%)", cursor: "ns-resize" } },
        { direction: "bottom", style: { bottom: "-5px", left: "50%", transform: "translateX(-50%)", cursor: "ns-resize" } },
        { direction: "left", style: { top: "50%", left: "-5px", transform: "translateY(-50%)", cursor: "ew-resize" } },
        { direction: "right", style: { top: "50%", right: "-5px", transform: "translateY(-50%)", cursor: "ew-resize" } },
    ];

    return (
        <div style={imageObjectStyles} onMouseDown={(e) => handleMouseDownMove(e,)}>
            <img style={contentStyles} draggable={isSelected} src={imageObject.url} alt="Slide Object" />
            {(isSelected && !isSlideCollection) &&
                handles.map((handle) => (
                    <div
                        key={handle.direction}
                        style={{ ...handleStyles, ...handle.style }}
                        onMouseDown={(e) => handleMouseDownResize(e, handle.direction)}
                    ></div>
                ))}
        </div>
    )
}

export {
    ImageObject
}