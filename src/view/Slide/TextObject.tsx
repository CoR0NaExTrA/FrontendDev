import { Text } from "../../Entities/BaseTypes"
import {CSSProperties, useRef} from "react";

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

    function MouseDownHandle(e) {
        e.target.style.zIndex = 1000
        document.body.append(e.target)
        
        moveAt(e.pageX, e.pageY)

        function moveAt(pageX: number, pageY: number) {
            e.target.style.left = pageX - e.target.offsetWidth / 2 + 'px'
            e.target.style.top = pageY - e.target.offsetHeight / 2 + 'px'
          }
        
          function onMouseMove(e) {
            moveAt(e.pageX, e.pageY)
          }
        
          // (3) перемещать по экрану
          document.addEventListener('mousemove', onMouseMove);
        
          // (4) положить мяч, удалить более ненужные обработчики событий
          e.target.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove)
            e.target.onmouseup = null;
          }
    }

    function DragStartHandle() {
        return false
    }

    return (
        <p style={textObjectStyles} draggable={true} onMouseDown={(e) => MouseDownHandle(e)} onDragStart={() => DragStartHandle()}>{textObject.value}</p>
    )
}

export {
    TextObject,
}