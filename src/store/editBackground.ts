import { EditorType } from "../Entities/SelectionType"
import { BackgroundSlide } from "../Entities/SlideType"


function editBackground(editor: EditorType, newBackground: BackgroundSlide): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            
        }
    }
}

export {
    editBackground,
}