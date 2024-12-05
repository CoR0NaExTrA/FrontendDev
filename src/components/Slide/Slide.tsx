import { CSSProperties, useRef } from "react"
import { TextObject } from "./TextObject"
import { ObjectType } from "../../Entities/BaseTypes"
import { BackgroundType, SlideType } from "../../Entities/SlideType"
import { ImageObject } from "./ImageObject"
import styles from "./Slide.module.css"
import { setSelectionObject } from "../../store/functions/setSelectionObject"
import { dispatch } from "../../store/editor"
import { SelectionObject, SelectionType } from "../../Entities/SelectionType"

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    isSlideCollection: boolean,
    className: string,
    selection: SelectionObject,
}

function Slide({slide, scale = 1, isSelected, isSlideCollection, className, selection}: SlideProps) {
    const containerRef = useRef(null);
    
    const slideStyles: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: isSelected ? '3px solid #0b57d0' : "1px solid #E5E4E2",
        boxShadow: !isSelected ? '3px 3px #E5E4E2': 'none'
    }

    switch (slide.background.type) {
        case BackgroundType.Color:
            slideStyles.backgroundColor = slide.background.color
            break;
        case BackgroundType.Image:
            slideStyles.backgroundImage = `url(${slide.background.url})`
            slideStyles.backgroundRepeat = 'no-repeat'
            slideStyles.backgroundSize = 'cover'
            slideStyles.backgroundPosition = 'center'
            break;
    }

    function onObjectClick(slideId: string) {
        dispatch(setSelectionObject, {
            type: SelectionType.Slide,
            selectedObjectId: slideId,
        })
    }

    return (
        <div ref={containerRef} style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.listObjects.map((slideObject) => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return ( 
                            <div key={slideObject.id} onClick={() => {onObjectClick(slide.id)}}>
                                <TextObject textObject={slideObject} scale={scale} 
                                containerRef={containerRef} isSelected={slideObject.id == selection.selectedObjectId} isSlideCollection={isSlideCollection}/> 
                            </div>
                        )
                    case ObjectType.Image:
                        return ( 
                            <div key={slideObject.id} onClick={() => {onObjectClick(slide.id)}}>
                                <ImageObject imageObject={slideObject} scale={scale} 
                                containerRef={containerRef} isSelected={slideObject.id == selection.selectedObjectId} isSlideCollection={isSlideCollection}/> 
                            </div> 
                        )
                    default:
                        throw new Error(`Unknown slide type`)
                }
            })}
        </div>
    )
}

export {
    Slide
}