import { Text } from "../../Entities/BaseTypes"
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: Text,
    scale?: number,
}
function TextObject({textObject, scale = 1}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.pos.y * scale}px`,
        left: `${textObject.pos.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`
    }
    return (
        <p style={textObjectStyles}>{textObject.value}</p>
    )
}

export {
    TextObject,
}