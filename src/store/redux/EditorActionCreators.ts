import { EditorType } from "../SelectionType";
import { ActionType } from "./Actions";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.Set_Editor,
        payload: newEditor,
    }
}

export {
    setEditor
}