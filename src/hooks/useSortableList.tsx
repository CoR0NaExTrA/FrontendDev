import { useState, useCallback, useEffect } from "react";
import { SlideType } from "../store/SlideType";

export function useSlideReorder(
    initialSlides: SlideType[],
    updateSlides: (slides: SlideType[]) => void,
    selectedSlideIds: string[],
) {
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

            const draggedSlides = slideCollection.filter(slide =>
                selectedSlideIds.includes(slide.id)
            );
            const remainingSlides = slideCollection.filter(
                slide => !selectedSlideIds.includes(slide.id)
            );

            const reorderedSlides = [...remainingSlides];
            reorderedSlides.splice(targetIndex, 0, ...draggedSlides);

            setSlides(reorderedSlides);
        },
        [draggedIndex, selectedSlideIds, slideCollection]
    );

    const handleDragEnd = useCallback(() => {
        if (isDragging) {
            updateSlides(slideCollection);
        }
        setDraggedIndex(null);
        setIsDragging(false);
    }, [isDragging, slideCollection, updateSlides]);

    return {
        slideCollection,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
    };
}
