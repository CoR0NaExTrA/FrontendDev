import React, { CSSProperties } from "react"
import { TextObject } from "./TextObject"
import { Gradient, gradientToCss, ObjectType } from "../../store/BaseTypes"
import { BackgroundType, SlideType } from "../../store/SlideType"
import { ImageObject } from "./ImageObject"
import styles from "./Slide.module.css"
import { SelectionType } from "../../store/SelectionType"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppActions } from "../../hooks/useAppActions"
import { useZoom } from "../../hooks/ZoomContext"

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    className: string,
    containerRef: any,
}

function Slide({slide, className, containerRef}: SlideProps) {
    const selectionSlide = useAppSelector((editor => editor.selectionSlide))
    const isSelected = (slide.id == selectionSlide.selectedSlideId)
    const {setSelectionObject} = useAppActions()

    const { zoom } = useZoom();
    let scale = zoom / 100
    
    const slideStyles: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: "1px solid #E5E4E2",
        boxShadow: !isSelected ? '3px 3px #E5E4E2': 'none'
    }

    switch (slide.background.type) {
        case BackgroundType.Color:
            if ((slide.background.color as Gradient).gradientType !== undefined) {
                slideStyles.backgroundImage = gradientToCss(slide.background.color as Gradient);
            } else {
                slideStyles.backgroundColor = slide.background.color as string;
            }
            break;
        case BackgroundType.Image:
            slideStyles.backgroundImage = `url(${slide.background.url})`
            slideStyles.backgroundRepeat = 'no-repeat'
            slideStyles.backgroundSize = 'cover'
            slideStyles.backgroundPosition = 'center'
            break;
    }

    function onObjectClick(objectId: string, e: React.MouseEvent) {
        e.stopPropagation()
        setSelectionObject({
            type: SelectionType.Object,
            selectedObjectId: objectId,
        })
    }

    function onSlideClick() {
        setSelectionObject({
            type: SelectionType.Object,
            selectedObjectId: '',
        })
    }

    return (
        <div style={slideStyles} className={styles.slide + ' ' + className} onClick={onSlideClick}>
            {slide.listObjects.map((slideObject) => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return ( 
                            <div key={slideObject.id} onClick={(e) => onObjectClick(slideObject.id, e)}>
                                <TextObject textObject={slideObject} scale={scale} 
                                containerRef={containerRef}/> 
                            </div>
                        )
                    case ObjectType.Image:
                        return ( 
                            <div key={slideObject.id} onClick={(e) => {onObjectClick(slideObject.id, e)}}>
                                <ImageObject imageObject={slideObject} scale={scale} 
                                containerRef={containerRef}/> 
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