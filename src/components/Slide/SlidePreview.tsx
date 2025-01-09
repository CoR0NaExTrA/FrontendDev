import React from "react";
import { BackgroundType, SlideType } from "../../store/SlideType";
import styles from "./SlidePreview.module.css";
import { ObjectType } from "../../store/BaseTypes";
import { TextPreview } from "./TextPreview";
import { ImagePreview } from "./ImagePreview";

type SlidePreviewProps = {
  slide: SlideType;
  scale?: number;
}

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

function SlidePreview({ slide, scale = 0.2 }: SlidePreviewProps) {
    const slideStyles: React.CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        position: "relative",
        border: "1px solid #ccc",
        borderRadius: 'inherit',
    }

    switch (slide.background.type) {
        case BackgroundType.Color:
            slideStyles.backgroundColor = slide.background.color as string
            break;
        case BackgroundType.Image:
            slideStyles.backgroundImage = `url(${slide.background.url})`
            slideStyles.backgroundRepeat = 'no-repeat'
            slideStyles.backgroundSize = 'cover'
            slideStyles.backgroundPosition = 'center'
            break
    }

  return (
    <div style={slideStyles} className={styles.preview}>
      {slide.listObjects.map((slideObject) => {
                switch (slideObject.objectType) {
                    case ObjectType.Text:
                        return ( 
                            <div key={slideObject.id}>
                                <TextPreview textObject={slideObject} scale={scale}/> 
                            </div>
                        )
                    case ObjectType.Image:
                        return ( 
                            <div key={slideObject.id}>
                                <ImagePreview imageObject={slideObject} scale={scale}/> 
                            </div> 
                        )
                    default:
                        throw new Error(`Unknown slide type`)
                }
            })}
    </div>
  );
}

export { SlidePreview };
