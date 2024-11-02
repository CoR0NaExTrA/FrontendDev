import { SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { dispatch } from "../store/editor"
import { setSelection } from "../store/setSelection"
import { Slide } from "./Slide/Slide"
import styles from "./SlideCollecion.module.css"


type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionType,
}

function SlideCollection({slideList, selection}: SlideCollectionProps) {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedObjectById: slideId,
        })
    }

    console.log(slideList);
    
    return (
        <div className={styles.slideList}>
            {slideList.map(slide => 
                <div key={slide.id} onClick={() => {onSlideClick(slide.id)}}>
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