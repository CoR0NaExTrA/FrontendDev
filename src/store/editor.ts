import { EditorType } from '../store/SelectionType'
import {editor} from './data.ts'

let _editor = editor
let _handler: Function | null = null

function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: any): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }

    localStorage.setItem('editorState', JSON.stringify(newEditor));
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}