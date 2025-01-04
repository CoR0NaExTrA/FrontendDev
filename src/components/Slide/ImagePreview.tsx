import { CSSProperties } from "react"
import { Image } from "../../store/BaseTypes"

type ImagePreviewProps = {
    imageObject: Image,
    scale: number,
}

function ImagePreview({imageObject, scale}: ImagePreviewProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.y * scale}px`,
        left: `${imageObject.pos.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const contentStyles: CSSProperties = {
        width: "100%",
        height: "100%",
    }

    return (
        <div style={imageObjectStyles}>
            <img style={contentStyles} src={imageObject.url} alt="Slide Object" />
        </div>
    )
}

export {
    ImagePreview
}