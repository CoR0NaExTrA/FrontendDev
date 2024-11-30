import { EditorType, SelectionType } from "../../Entities/SelectionType"


function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection, 
            selectedObjectById: newSelection.selectedObjectById,
            selectedSlideById: newSelection.selectedSlideById,
        }
    }
}

export {
    setSelection,
}