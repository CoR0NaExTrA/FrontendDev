import { useEffect, useRef, useState } from "react"
import { EditorType, SelectionSlide, SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { dispatch } from "../store/editor"
import { setSelectionSlide } from "../store/functions/setSelectionSlide"
import { Slide } from "../components/Slide/Slide"
import styles from "./SlideCollecion.module.css"


type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionSlide,
    editor: EditorType,
}

function SlideCollection({slideList, selection, editor}: SlideCollectionProps) {
    const [slideCollecion, setSlideCollection] = useState(slideList)

    useEffect(() => { 
        setSlideCollection(slideList)
    }, [slideList]);

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
        dispatch(setSelectionSlide, {
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
                draggable={slide.id == selection.selectedSlideId}>
                    <Slide 
                        slide={slide}
                        scale={0.2}
                        isSelected={slide.id == selection.selectedSlideId}
                        isSlideCollection={true}
                        className={styles.item}
                        selection={editor.selectionObject}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}