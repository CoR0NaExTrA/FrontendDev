import { EditorType } from "../../Entities/SelectionType"
import { SlideType } from "../../Entities/SlideType"


function addSlide(editor: EditorType, newSlide: SlideType): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: [
                ...editor.presentation.listSlides,
                newSlide
            ]
        }
    }
}

export {
    addSlide,
}