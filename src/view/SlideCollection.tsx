import { SelectionType } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { Slide } from "./Slide"

type SlideCollectionProps = {
    slideList: SlideType[],
    selection: SelectionType,
}

function SlideCollection({slideList, selection}: SlideCollectionProps) {
    return (
        <div>
            {slideList.map(slide => 
                <div key={slide.id}>
                    <Slide 
                        slide={slide}
                        scale={0.2}
                        isSelected={slide.id == selection.selectedObjectById}
                    ></Slide>    
                </div>
            )}
        </div>
    )
}

export {
    SlideCollection
}