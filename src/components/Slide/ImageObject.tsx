import { CSSProperties, useState } from "react"
import { Image } from "../../Entities/BaseTypes"

type ImageObjectProps = {
    imageObject: Image,
    scale?: number,
    containerRef: any,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected, containerRef}: ImageObjectProps) {

    const [position, setPosition] = useState(imageObject.pos)

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!containerRef.current || !isSelected) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const elementRect = (e.target as HTMLElement).getBoundingClientRect()

        const startX = e.clientX
        const startY = e.clientY

        const initialX = position.x
        const initialY = position.y

        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - startX
            const deltaY = event.clientY - startY

            // Новые координаты с учётом ограничений
            const newX = Math.max(
                0,
                Math.min(containerRect.width - elementRect.width, initialX + deltaX)
            );
            const newY = Math.max(
                0,
                Math.min(containerRect.height - elementRect.height, initialY + deltaY)
            )

            setPosition({ x: newX, y: newY });
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        // Добавляем события перемещения и завершения
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        cursor: isSelected ? "grab" : "default",
        border: isSelected ? "1px solid #0b57d0" : "none",
    }

    return (
        <img style={imageObjectStyles} draggable={isSelected} src={imageObject.url} onMouseDown={(e: React.MouseEvent<HTMLParagraphElement>) => handleMouseDown(e)} alt="Slide Object" />
    )
}

export {
    ImageObject
}