import { CSSProperties } from "react"
import { Image } from "../../Entities/BaseTypes"

type ImageObjectProps = {
    imageObject: Image,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected}: ImageObjectProps) {

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.y * scale}px`,
        left: `${imageObject.pos.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }

    return (
        <img style={imageObjectStyles} src={imageObject.url} />
    )
}

export {
    ImageObject
}