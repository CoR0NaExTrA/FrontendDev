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

function dispatch(modifyFn: Function, payload?: Object, p0?: { id: string; listObjects: { id: string; pos: { x: number; y: number }; size: { width: number; height: number }; objectType: any; fontSize: number; fontFamily: string; fontFormatting: any; fontColor: string; fontBgColor: string; value: string }[]; background: { type: string; color: string } }): void {
    const newEditor = modifyFn(_editor, payload)
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