import { CSSProperties } from "react"
import { SlideType } from "../Entities/SlideType"
import { ObjectType } from "../Entities/BaseTypes"
import { ImageObject } from "./ImageObject"
import { TextObject } from "./TextObject"

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
}

function Slide({slide, scale = 1, isSelected}: SlideProps) {
    const slideStyles: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }

    return (
        <div style={slideStyles}>
            {slide.listObjects.map(slideObject => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return <TextObject key={slideObject.id} textObject={slideObject} scale={scale}></TextObject>
                    case ObjectType.Image:
                        return <ImageObject key={slideObject.id} imageObject={slideObject} scale={scale}></ImageObject>
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