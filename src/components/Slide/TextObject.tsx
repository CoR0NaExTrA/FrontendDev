import { Text } from "../../Entities/BaseTypes"
import { CSSProperties, useState } from "react";
import useDraggable from "../../hooks/useDrag";
import { setSelection } from "../../store/functions/setSelection";
import { dispatch } from "../../store/editor";

type TextObjectProps = {
    textObject: Text,
    scale?: number,
    isSelected: boolean,
    containerRef: any,
}
function TextObject({textObject, scale = 1, isSelected, containerRef}: TextObjectProps) {  
    const { position, handleMouseDown} = useDraggable(containerRef)
    const [text, setText] = useState(textObject.value);

    const handleChange = (event: any) => {
        setText(event.target.innerText); // Сохраняем новый текст в состояние
        textObject.value = text
    };

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        margin: 0,
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    }

    if (isSelected) {
        textObjectStyles.border = '1px solid #0b57d0'
    }

    return (
        <div>
            <p contentEditable onInput={handleChange} suppressContentEditableWarning style={textObjectStyles} draggable={isSelected} onMouseDown={(e: React.MouseEvent<HTMLParagraphElement>) => handleMouseDown(e)}>
                {text}
            </p>
        </div>
    )
}

export {
    TextObject,
}