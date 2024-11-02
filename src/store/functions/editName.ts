import { EditorType } from "../../Entities/SelectionType"


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