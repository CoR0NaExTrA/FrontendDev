import { SelectionType } from "../store/SelectionType"
import styles from "./SlideCollecion.module.css"
import { useAppSelector } from "./../hooks/useAppSelector"
import { useAppActions } from "./../hooks/useAppActions"
import { SlideType } from "../store/SlideType"
import { useSlideReorder } from "../hooks/useSortableList"
import { SlidePreview } from "../components/Slide/SlidePreview"
import { useState } from "react"

function getSlideWrapperClassName(slideId: string, selectedSlideId: string[]): string {
    let className = styles.slideWrapper
    if (selectedSlideId.includes(slideId)) {
        className = `${styles.selectedSlide}`
    }
    return className
}

function SlideCollection() {
    const editor = useAppSelector((editor => editor))
    const selectionSlide = editor.selectionSlide
    const { setSelectionSlide, updateSlides } = useAppActions()

    const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>([selectionSlide.selectedSlideId])

    const { slideCollection, handleDragStart, handleDragEnter, handleDragEnd } =
        useSlideReorder(editor.presentation.listSlides, updateSlides, selectedSlideIds)

        function onSlideClick(slideId: string, event: React.MouseEvent) {
            let updatedSelectedSlideIds: string[] = []
            
            if (event.ctrlKey || event.metaKey) {
                updatedSelectedSlideIds = selectedSlideIds.includes(slideId)
                    ? selectedSlideIds.filter(id => id !== slideId)
                    : [...selectedSlideIds, slideId]
            } else if (event.shiftKey && selectedSlideIds.length > 0) {
                const startIndex = slideCollection.findIndex(slide =>
                    selectedSlideIds.includes(slide.id)
                )
                const endIndex = slideCollection.findIndex(slide => slide.id === slideId)
                const range = slideCollection.slice(
                    Math.min(startIndex, endIndex),
                    Math.max(startIndex, endIndex) + 1
                )
                updatedSelectedSlideIds = range.map(slide => slide.id)
            } else {
                updatedSelectedSlideIds = [slideId]
            }
            setSelectedSlideIds(updatedSelectedSlideIds)
            
            setSelectionSlide({
                type: SelectionType.Slide,
                selectedSlideId: slideId,
            })
        }
        

    return (
        <div className={styles.slideList}>
            {slideCollection.map((slide: SlideType, index: number) => 
                <div key={slide.id} id={slide.id} onClick={(e) => {onSlideClick(slide.id, e)}}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                draggable={selectedSlideIds.includes(slide.id)} className={getSlideWrapperClassName(slide.id, selectedSlideIds || [])}>
                    <SlidePreview slide={slide} />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}