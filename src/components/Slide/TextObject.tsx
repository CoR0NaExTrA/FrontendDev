import { FontFormatting, Point, Size, Text } from "../../store/BaseTypes"
import { CSSProperties, useState } from "react";
import { useAppSelector } from "../../view/hooks/useAppSelector";
import { useAppActions } from "../../view/hooks/useAppActions";

type TextObjectProps = {
    textObject: Text,
    scale?: number,
    isSlideCollection: boolean,
    containerRef: any,
}
function TextObject({textObject, scale = 1, isSlideCollection, containerRef}: TextObjectProps) {
    const selectionObject = useAppSelector((editor => editor.selectionObject))
    const {updatePosition, updateSize, updateText} = useAppActions()
    const isSelected = textObject.id == selectionObject.selectedObjectId

    let position = textObject.pos
    let size = textObject.size
    const [dragging, setDragging] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    let currentText = textObject.value

    function onUpdatePosition(position: Point) {
        updatePosition(position)
    }

    function onUpdateSize(size: Size) {
        updateSize(size)
    }

    function onUpdateText(text: string) {
        updateText(text)
    }

    const handleMouseDownMove = (e: React.MouseEvent) => {
        if (!containerRef.current || isEditing) return;
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

            position = {
                x: Math.max(0, Math.min(containerRect.width - size.width, initialX + deltaX)),
                y: Math.max(0, Math.min(containerRect.height - size.height, initialY + deltaY)),
            }
            onUpdatePosition(position)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

            setDragging(false)
        }

        setDragging(true)
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
        e.preventDefault()
        e.stopPropagation()
        if (!containerRef.current || isEditing) return

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
                newX = initialX + deltaX;
            }
            if (direction.includes("bottom")) {
                newHeight = Math.max(10, initialHeight + deltaY)
            }
            if (direction.includes("top")) {
                newHeight = Math.max(10, initialHeight - deltaY)
                newY = initialY + deltaY
            }

            size = { width: newWidth, height: newHeight }
            position = { x: newX, y: newY }
            onUpdateSize(size)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    };

    const handleDoubleClick = () => setIsEditing(true)

    const handleBlur = () => {
        setIsEditing(false)
        onUpdateText(currentText)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setIsEditing(false)
            onUpdateText(currentText)
        }
    };

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        margin: 0,
        transform: `translate(${position.x * scale}px, ${position.y * scale}px)`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        border: isSelected ? "1px solid #0b57d0" : "none",
        boxSizing: "border-box",
        overflow: "clip",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    if (dragging && !isSlideCollection) {
        textObjectStyles.cursor = 'grabbing'
    }
    else if (!isSlideCollection && isSelected) {
        textObjectStyles.cursor = 'grab'
    }
    if (isEditing) {
        textObjectStyles.cursor = 'text'
    }

    const contentStyles: CSSProperties = {
        margin: 0,
        fontSize: `${textObject.fontSize * scale}px`,
        fontFamily: textObject.fontFamily,
        fontStyle: (textObject.fontFormatting === FontFormatting.italic) ? textObject.fontFormatting : 'normal',
        fontWeight: (textObject.fontFormatting === FontFormatting.bold) ? textObject.fontFormatting : 'normal',
        textDecoration: (textObject.fontFormatting === FontFormatting.underline) ? textObject.fontFormatting : 'none',
        color: textObject.fontColor,
        textAlign: "center",
        lineHeight: 1,
        whiteSpace: "wrap",
        overflow: "hidden",
    }

    const handleStyles: CSSProperties = {
        position: "absolute",
        width: "15px",
        height: "15px",
        backgroundColor: "#0b57d0",
        zIndex: 10,
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

    function handleSaveText(): void {
    }

    return (
        <div style={textObjectStyles} onMouseDown={(!isSlideCollection && isSelected) ? handleMouseDownMove: handleSaveText} onDoubleClick={handleDoubleClick}>
            {(isEditing && !isSlideCollection) ? (
                <div contentEditable suppressContentEditableWarning
                    style={{
                        ...contentStyles,
                        outline: "none",
                        cursor: "text",
                        background: "none",
                        fontFamily: textObject.fontFamily,
                        color: textObject.fontColor,
                    }} onBlur={handleBlur} onKeyDown={handleKeyDown} onInput={(e) => currentText = e.currentTarget.textContent || ""}
                >
                    {currentText}
                </div>
            ) : (
                <p style={contentStyles}>{currentText}</p>
            )}
            {(isSelected && !isSlideCollection) &&
                handles.map((handle) => (
                    <div key={handle.direction} style={{ ...handleStyles, ...handle.style }} onMouseDown={(e) => handleMouseDownResize(e, handle.direction)}></div>
                ))}
        </div>
    )
}

export {
    TextObject,
}