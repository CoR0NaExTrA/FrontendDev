import { useState, useCallback, useEffect } from "react";
import { SlideType } from "../store/SlideType";

export function useSlideReorder( initialSlides: SlideType[], updateSlides: (slides: SlideType[]) => void ) {
    const [slideCollection, setSlides] = useState(initialSlides);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    

    useEffect(() => {
        setSlides(initialSlides);
    }, [initialSlides]);

    const handleDragStart = useCallback((index: number) => {
        setDraggedIndex(index);
        setIsDragging(true);
    }, []);

    const handleDragEnter = useCallback(
        (targetIndex: number) => {
            if (draggedIndex === null || draggedIndex === targetIndex) return;

            const reorderedSlides = [...slideCollection];
            const [draggedSlide] = reorderedSlides.splice(draggedIndex, 1);
            reorderedSlides.splice(targetIndex, 0, draggedSlide);

            setSlides(reorderedSlides);
            setDraggedIndex(targetIndex);
        },
        [draggedIndex, slideCollection]
    );

    const handleDragEnd = useCallback(() => {
        if (isDragging) {
            updateSlides(slideCollection); 
        }
        setDraggedIndex(null);
        setIsDragging(false);
    }, [slideCollection, updateSlides]);

    return {
        slideCollection,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
    };
}
