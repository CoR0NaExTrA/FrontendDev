import { EditorType, SelectionType } from "../../Entities/SelectionType"


function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    if (newSelection.selectedObjectById) {
        const selectionObject = newSelection.selectedObjectById
    }
    else {
        const selectionSlide = newSelection.selectedSlideById
    }

    return {
        ...editor,
        selection: {
            ...editor.selection, 
            
        }
    }
}

export {
    setSelection,
}