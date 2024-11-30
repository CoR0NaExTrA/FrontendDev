import { CSSProperties, useRef } from "react"
import { TextObject } from "./TextObject"
import { ObjectType } from "../../Entities/BaseTypes"
import { SlideType } from "../../Entities/SlideType"
import { ImageObject } from "./ImageObject"
import styles from "./Slide.module.css"
import { SelectionType } from "../../Entities/SelectionType"
import { dispatch } from "../../store/editor"
import { setSelection } from "../../store/functions/setSelection"

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    selection: SelectionType,
}

function Slide({slide, scale = 1, isSelected, className, selection}: SlideProps) {
    const containerRef = useRef(null);
    
    const slideStyles: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        background: slide.background,
        backgroundImage: slide.background,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    }
    
    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }

    function onObjectClick(objectId: string) {
        dispatch(setSelection, {
            selectedObjectById: objectId,
        })
    }

    return (
        <div ref={containerRef} style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.listObjects.map((slideObject) => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return (
                            <div key={slideObject.id} onClick={() => onObjectClick(slideObject.id)}>
                                <TextObject textObject={slideObject} scale={scale} isSelected={slideObject.id == selection.selectedObjectById} containerRef={containerRef}/>
                            </div>
                        )
                    case ObjectType.Image:
                        return (
                            <div key={slideObject.id} onClick={() => onObjectClick(slideObject.id)}>
                                <ImageObject imageObject={slideObject} scale={scale} isSelected={slideObject.id == selection.selectedObjectById}/>
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