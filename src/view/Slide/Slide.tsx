import { CSSProperties } from "react"
import { TextObject } from "./TextObject"
import { ObjectType } from "../../Entities/BaseTypes"
import { SlideType } from "../../Entities/SlideType"
import { ImageObject } from "./ImageObject"
import styles from "./Slide.module.css"

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
}

function Slide({slide, scale = 1, isSelected, className}: SlideProps) {
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

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.listObjects.map((slideObject) => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return <TextObject key={slideObject.id} textObject={slideObject} scale={scale} isSelected={true}/>
                    case ObjectType.Image:
                        return <ImageObject key={slideObject.id} imageObject={slideObject} scale={scale} />
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