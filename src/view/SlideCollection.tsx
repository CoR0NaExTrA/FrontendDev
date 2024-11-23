import { DragEvent, useState } from "react"
import { SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { dispatch } from "../store/editor"
import { setSelection } from "../store/functions/setSelection"
import { Slide } from "./Slide/Slide"
import styles from "./SlideCollecion.module.css"

type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionType,
}

function SlideCollection({slideList, selection}: SlideCollectionProps) {
    const [slideCollecion, setSlideCollection] = useState(slideList)

    const [currentSlide, setCurrentSlide] = useState<SlideType|null>(null)

    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedObjectById: slideId,
        })
    }
    
    function DragStartHandle(e: DragEvent<HTMLDivElement>, slide: SlideType) {
        setCurrentSlide(slide)
    }

    function DragLeaveHandle(e: DragEvent<HTMLDivElement>) {
        
    }

    function DragEndHandle(e: DragEvent<HTMLDivElement>) {
        
    }
    
    function DragOverHandle(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function DropHandle(e: DragEvent<HTMLDivElement>, slide: SlideType) {
        e.preventDefault()
        setSlideCollection(slideCollecion.map(s => {
            if (s.id === slide.id) {
                return {}
            } 
            }
        ))
    }

    return (
        <div className={styles.slideList} >
            {slideList.map(slide => 
                <div key={slide.id} onClick={() => {onSlideClick(slide.id)}} draggable={slide.id == selection.selectedObjectById}
                onDragStart={(e) => DragStartHandle(e, slide)} onDragLeave={(e) => DragLeaveHandle(e)} 
                onDragEnd={(e) => DragEndHandle(e)} onDrop={(e) => DropHandle(e, slide)} onDragOver={(e) => DragOverHandle(e)}
                >
                    <Slide 
                        slide={slide}
                        scale={0.2}
                        isSelected={slide.id == selection.selectedObjectById}
                        className={styles.item}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}