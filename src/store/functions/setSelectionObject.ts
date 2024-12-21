import { EditorType, SelectionObject } from "../../store/SelectionType"


function setSelectionObject(editor: EditorType, newSelectionObject: SelectionObject): EditorType {
    return {
        ...editor,
        selectionSlide: {
            ...editor.selectionSlide
        },
        selectionObject: newSelectionObject,
    }
}

export {
    setSelectionObject,
}