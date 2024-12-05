import { EditorType, SelectionSlide } from "../../Entities/SelectionType"


function setSelectionSlide(editor: EditorType, newSelectionSlide: SelectionSlide): EditorType {
    return {
        ...editor,
        selectionSlide: newSelectionSlide,
        selectionObject: {
            ...editor.selectionObject
        }
    }
}

export {
    setSelectionSlide,
}