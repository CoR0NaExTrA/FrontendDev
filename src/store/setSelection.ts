import { EditorType, SelectionType } from "../Entities/SelectionType"


function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}