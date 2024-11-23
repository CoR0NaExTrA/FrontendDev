import { EditorType } from '../Entities/SelectionType.ts'
import {editor} from './data.ts'

let _editor = editor
let _handler: Function | null = null

function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: object) {
    const newEditor: EditorType = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}