import { SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { Slide } from "./Slide/Slide"
import styles from "./SlideCollecion.module.css"


type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionType,
}

function SlideCollection({slideList, selection}: SlideCollectionProps) {
    return (
        <div className={styles.slideList}>
            {slideList.map(slide => 
                <div key={slide.id}>
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