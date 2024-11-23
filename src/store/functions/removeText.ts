import { ObjectType } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function removeText(editor: EditorType): EditorType {
    console.log('editor', editor)

    const removeTextId = editor.selection.selectedObjectById
    const removeTextIndex = editor.presentation.listSlides.findIndex(slide => slide.id == removeTextId)

    const textIndex = editor.presentation.listSlides[removeTextIndex].listObjects.findIndex(object => object.objectType == ObjectType.Text)

    const newSlides = editor.presentation.listSlides
    newSlides[removeTextIndex].listObjects.splice(textIndex, 1)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    removeText,
}