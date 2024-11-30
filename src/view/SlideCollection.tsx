import { DragEvent, useEffect, useRef, useState } from "react"
import { SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { dispatch } from "../store/editor"
import { setSelection } from "../store/functions/setSelection"
import { Slide } from "../components/Slide/Slide"
import styles from "./SlideCollecion.module.css"


type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionType,
}

function SlideCollection({slideList, selection}: SlideCollectionProps) {
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
        dispatch(setSelection, {
            selectedSlideById: slideId,
        })
    }

    return (
        <div className={styles.slideList}>
            {slideCollecion.map((slide, index) => 
                <div key={slide.id} onClick={() => {onSlideClick(slide.id)}}
                onDragStart={() => dragSlide.current = index}
                onDragEnter={() => dragOverSlide.current = index}
                onDragEnd={handleSort}
                draggable={slide.id == selection.selectedSlideById}>
                    <Slide 
                        slide={slide}
                        scale={0.2}
                        isSelected={slide.id == selection.selectedSlideById}
                        className={styles.item}
                        selection={selection}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}