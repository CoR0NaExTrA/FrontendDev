import { Text } from "../../Entities/BaseTypes"
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: Text,
    scale?: number,
    isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        margin: 0,
        top: `${textObject.pos.y * scale}px`,
        left: `${textObject.pos.x * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    }

    if (isSelected) {
        textObjectStyles.border = '1px solid #0b57d0'
    }

    function ResizeHandle() {
    }

    return (
        <p style={textObjectStyles} draggable={true} onResize={() => ResizeHandle()}>{textObject.value}</p>
    )
}

export {
    TextObject,
}