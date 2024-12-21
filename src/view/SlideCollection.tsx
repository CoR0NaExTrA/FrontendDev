import { useEffect, useRef, useState } from "react"
import { SelectionType } from "../store/SelectionType"
import { Slide } from "../components/Slide/Slide"
import styles from "./SlideCollecion.module.css"
import { useAppSelector } from "./hooks/useAppSelector"
import { useAppActions } from "./hooks/useAppActions"

function getSlideWrapperClassName(slideId: string, selectedSlideId: string | undefined): string {
    let className = styles.slideWrapper
    if (slideId === selectedSlideId) {
        className = `${className} ${styles.selectedSlide}`
    }
    return className
}

function SlideCollection() {
    const editor = useAppSelector((editor => editor))
    const selectionSlide = editor.selectionSlide
    const {setSelectionSlide} = useAppActions()

    const [slideCollecion, setSlideCollection] = useState(editor.presentation.listSlides)

    useEffect(() => {
        setSlideCollection(editor.presentation.listSlides)
    }, [editor.presentation.listSlides]);

    const dragSlide = useRef<any>(null)
    const dragOverSlide = useRef<any>(null)

    const handleSort = () => {
        let _slideCollecion = [...slideCollecion]

        const draggedSlideContent = _slideCollecion.splice(dragSlide.current, 1)[0]
        
        _slideCollecion.splice(dragOverSlide.current, 0 , draggedSlideContent)

        dragSlide.current = null
        dragOverSlide.current = null

        setSlideCollection(_slideCollecion)
    }

    function onSlideClick(slideId: string) {
        setSelectionSlide({
            type: SelectionType.Slide,
            selectedSlideId: slideId,
        })
    }

    return (
        <div className={styles.slideList}>
            {slideCollecion.map((slide, index) => 
                <div key={slide.id} onClick={() => {onSlideClick(slide.id)}}
                onDragStart={() => dragSlide.current = index}
                onDragEnter={() => dragOverSlide.current = index}
                onDragEnd={handleSort}
                draggable={slide.id == selectionSlide.selectedSlideId} className={getSlideWrapperClassName(slide.id, selectionSlide?.selectedSlideId)}>
                    <Slide 
                        slide={slide}
                        scale={0.2}
                        isSlideCollection={true}
                        className={styles.slide}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}