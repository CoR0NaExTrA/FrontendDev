import { EditorType } from "../SelectionType"
import { SlideType } from "../SlideType"


function updateSlides(editor: EditorType, newSlides: SlideType[]): EditorType {
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    updateSlides,
}