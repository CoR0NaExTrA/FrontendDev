import { useState, useCallback, useRef } from "react";
import { Point, Size } from "../store/BaseTypes";

type UseDragAndResizeProps = {
    initialPosition: Point,
    initialSize: Size,
    scale: number,
    containerRef: React.RefObject<HTMLElement>,
    onUpdatePosition: (position: Point) => void,
    onUpdateSize: (size: Size) => void,
}

export function useDragAndResize({initialPosition, initialSize, scale, containerRef, onUpdatePosition, onUpdateSize}: UseDragAndResizeProps) {
    const positionRef = useRef(initialPosition);
    const sizeRef = useRef(initialSize);
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const resizeDirection = useRef<string | null>(null);

    const handleMouseDownMove = useCallback(
        (e: React.MouseEvent) => {
            if (resizeDirection.current || !containerRef.current) return;
            e.preventDefault()

            const containerRect = containerRef.current.getBoundingClientRect();
            const startX = e.clientX;
            const startY = e.clientY;

            const initialX = position.x;
            const initialY = position.y;

            const handleMouseMove = (event: MouseEvent) => {
                const deltaX = (event.clientX - startX) / scale;
                const deltaY = (event.clientY - startY) / scale;

                const newX = initialX + deltaX;
                const newY = initialY + deltaY;

                positionRef.current = { x: newX, y: newY };
                setPosition(positionRef.current);
                onUpdatePosition(positionRef.current);
            };

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                setIsDragging(false);
            };

            setIsDragging(true);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [position, size, scale, containerRef, onUpdatePosition, isResizing]
    );

    const handleMouseDownResize = useCallback(
        (e: React.MouseEvent, direction: string) => {
            if (isDragging || !containerRef.current) return;
            e.preventDefault()

            const containerRect = containerRef.current.getBoundingClientRect();
            const startX = e.clientX;
            const startY = e.clientY;

            const initialWidth = size.width;
            const initialHeight = size.height;
            const initialX = position.x;
            const initialY = position.y;

            resizeDirection.current = direction;

            const handleMouseMove = (event: MouseEvent) => {
                const deltaX = (event.clientX - startX) / scale;
                const deltaY = (event.clientY - startY) / scale;
            
                let newWidth = initialWidth;
                let newHeight = initialHeight;
                let newX = initialX;
                let newY = initialY;
            
                if (resizeDirection.current?.includes("right")) {
                    newWidth = Math.max(10, initialWidth + deltaX);
                    if (newX + newWidth > containerRect.width / scale) {
                        newWidth = containerRect.width / scale - newX;
                    }
                }
                if (resizeDirection.current?.includes("left")) {
                    newWidth = Math.max(10, initialWidth - deltaX);
                    newX = initialX + deltaX;
                    if (newX < 0) {
                        newX = 0;
                        newWidth = initialWidth + initialX;
                    }
                }
                if (resizeDirection.current?.includes("bottom")) {
                    newHeight = Math.max(10, initialHeight + deltaY);
                    if (newY + newHeight > containerRect.height / scale) {
                        newHeight = containerRect.height / scale - newY;
                    }
                }
                if (resizeDirection.current?.includes("top")) {
                    newHeight = Math.max(10, initialHeight - deltaY);
                    newY = initialY + deltaY;
                    if (newY < 0) {
                        newY = 0;
                        newHeight = initialHeight + initialY;
                    }
                }
            
                sizeRef.current = { width: newWidth, height: newHeight };
                positionRef.current = { x: newX, y: newY };

                setSize(sizeRef.current);
                setPosition(positionRef.current);

                onUpdateSize(sizeRef.current);
                onUpdatePosition(positionRef.current);
            };
            
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                setIsResizing(false);
                resizeDirection.current = null;
            };

            setIsResizing(true);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [size, position, scale, containerRef, onUpdateSize, onUpdatePosition, isDragging]
    );

    return {
        position,
        size,
        handleMouseDownMove,
        handleMouseDownResize,
    };
}
 