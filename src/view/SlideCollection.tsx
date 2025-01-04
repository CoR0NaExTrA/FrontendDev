import { SelectionType } from "../store/SelectionType"
import { Slide } from "../components/Slide/Slide"
import styles from "./SlideCollecion.module.css"
import { useAppSelector } from "./../hooks/useAppSelector"
import { useAppActions } from "./../hooks/useAppActions"
import { SlideType } from "../store/SlideType"
import { useSlideReorder } from "../hooks/useSortableList"
import { SlidePreview } from "../components/Slide/SlidePreview"

function getSlideWrapperClassName(slideId: string, selectedSlideId: string | undefined): string {
    let className = styles.slideWrapper
    if (slideId === selectedSlideId) {
        className = `${styles.selectedSlide}`
    }
    return className
}

function SlideCollection() {
    const editor = useAppSelector((editor => editor))
    const selectionSlide = editor.selectionSlide
    const { setSelectionSlide, updateSlides } = useAppActions()

    const { slideCollection, handleDragStart, handleDragEnter, handleDragEnd } = useSlideReorder(editor.presentation.listSlides, updateSlides);

    function onSlideClick(slideId: string) {
        setSelectionSlide({
            type: SelectionType.Slide,
            selectedSlideId: slideId,
        })
    }

    return (
        <div className={styles.slideList}>
            {slideCollection.map((slide: SlideType, index: number) => 
                <div key={slide.id} onClick={() => {onSlideClick(slide.id)}}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                draggable={slide.id == selectionSlide.selectedSlideId} className={getSlideWrapperClassName(slide.id, selectionSlide?.selectedSlideId)}>
                    <SlidePreview slide={slide} />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}