import { EditorType, SelectionObject } from "../../Entities/SelectionType"


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