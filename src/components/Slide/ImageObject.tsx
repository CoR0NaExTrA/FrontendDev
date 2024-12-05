import { CSSProperties, useState } from "react"
import { Image } from "../../Entities/BaseTypes"

type ImageObjectProps = {
    imageObject: Image,
    scale?: number,
    containerRef: any,
    isSelected: boolean,
    isSlideCollection: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected, isSlideCollection, containerRef}: ImageObjectProps) {

    console.log(isSelected)
    const [position, setPosition] = useState(imageObject.pos)
    const [size, setSize] = useState(imageObject.size)
    const [dragging, setDragging] = useState(false)

    const handleMouseDownMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        e.preventDefault()
        e.stopPropagation()
        const containerRect = containerRef.current.getBoundingClientRect()
        const startX = e.clientX
        const startY = e.clientY

        const initialX = position.x
        const initialY = position.y

        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = (event.clientX - startX) / scale
            const deltaY = (event.clientY - startY) / scale

            setPosition({
                x: Math.max(0, Math.min(containerRect.width - size.width, initialX + deltaX)),
                y: Math.max(0, Math.min(containerRect.height - size.height, initialY + deltaY)),
            })
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

            setDragging(false)
        };

        setDragging(true)
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    };

    const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
        e.preventDefault()
        e.stopPropagation()
        if (!containerRef.current) return

        const startX = e.clientX
        const startY = e.clientY

        const initialWidth = size.width
        const initialHeight = size.height
        const initialX = position.x
        const initialY = position.y

        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = (event.clientX - startX) / scale
            const deltaY = (event.clientY - startY) / scale

            let newWidth = initialWidth
            let newHeight = initialHeight
            let newX = initialX
            let newY = initialY

            if (direction.includes("right")) {
                newWidth = Math.max(10, initialWidth + deltaX)
            }
            if (direction.includes("left")) {
                newWidth = Math.max(10, initialWidth - deltaX)
                newX = initialX + deltaX
            }
            if (direction.includes("bottom")) {
                newHeight = Math.max(10, initialHeight + deltaY)
            }
            if (direction.includes("top")) {
                newHeight = Math.max(10, initialHeight - deltaY)
                newY = initialY + deltaY
            }

            setSize({ width: newWidth, height: newHeight })
            setPosition({ x: newX, y: newY })
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        };

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    };

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        cursor: dragging ? "grabbing" : "grab",
        border: isSelected ? "1px solid #0b57d0" : "none",
        boxSizing: "border-box", // Учитываем рамку в размерах
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
        <div style={imageObjectStyles} onMouseDown={handleMouseDownMove}>
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