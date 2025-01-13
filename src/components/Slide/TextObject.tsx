import { FontFormatting, Text } from "../../store/BaseTypes"
import { CSSProperties, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppActions } from "../../hooks/useAppActions";
import { useDragAndResize } from "../../hooks/useDragAndDrop";
import { SelectionType } from "../../store/SelectionType";

type TextObjectProps = {
    textObject: Text,
    scale?: number,
    containerRef: any,
}

function TextObject({textObject, scale = 1, containerRef}: TextObjectProps) {
    const selectionObject = useAppSelector((editor => editor.selectionObject))
    const {updatePosition, updateSize, updateText, setSelectionObject} = useAppActions()
    const isSelected = (textObject.id == selectionObject.selectedObjectId)

    const { position, size, handleMouseDownMove, handleMouseDownResize } = useDragAndResize({
        initialPosition: textObject.pos, initialSize: textObject.size, scale,
        containerRef, onUpdatePosition: updatePosition, onUpdateSize: updateSize,
    })

    const [currentText, setCurrentText] = useState(textObject.value)
    const textRef = useRef<HTMLDivElement>(null);

    const handleBlur = () => {
        updateText(currentText)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            updateText(currentText)
        }
    }

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        setCurrentText(e.currentTarget.textContent || "")
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectionObject({ type: SelectionType.Object, selectedObjectId: textObject.id })
    }

    const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!textRef.current?.contains(e.target as Node)) {
            setSelectionObject({ type: SelectionType.Object, selectedObjectId: textObject.id })
            handleMouseDownMove(e)
        }
    }

    const containerStyles: CSSProperties = {
        position: 'absolute',
        margin: 0,
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        minWidth: `${100 * scale}px`,
        minHeight: `${100 * scale}px`,
        border: isSelected ? "1px solid #0b57d0" : "none",
        boxSizing: "border-box",
        overflow: "clip",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: 'move',
    }

    const textStyles: CSSProperties = {
        position: 'absolute',
        top: '0',
        left: '0',
        margin: 0,
        fontSize: `${textObject.fontSize * scale}px`,
        fontFamily: textObject.fontFamily,
        fontStyle: (textObject.fontFormatting === FontFormatting.italic) ? textObject.fontFormatting : 'normal',
        fontWeight: (textObject.fontFormatting === FontFormatting.bold) ? textObject.fontFormatting : 'normal',
        textDecoration: (textObject.fontFormatting === FontFormatting.underline) ? textObject.fontFormatting : 'none',
        color: textObject.fontColor,
        textAlign: "center",
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: `${10*scale}px`,
        minHeight: `${10*scale}px`,
        cursor: 'text',
        outline: 'none',
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

    return (
        <div style={containerStyles} onMouseDown={handleContainerMouseDown}>
            {isSelected &&
                handles.map((handle) => (
                    <div
                        key={handle.direction}
                        style={{ ...handleStyles, ...handle.style }}
                        onMouseDown={(e) => handleMouseDownResize(e, handle.direction)}
                    ></div>
                ))}
            <div
                ref={textRef}
                contentEditable
                suppressContentEditableWarning
                style={textStyles}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onClick={(e) => {e.stopPropagation(), e.preventDefault()}}
                onMouseDown={handleMouseDown}
            >
                {currentText || 'Текст'}
            </div>
        </div>
    )
}

export {
    TextObject,
}