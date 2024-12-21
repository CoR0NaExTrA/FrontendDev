import { EditorType } from "../../store/SelectionType"


function editName(editor: EditorType, newName: string): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: newName,
        }
    }
}

export {
    editName,
}