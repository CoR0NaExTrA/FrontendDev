import { ObjectType } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function removeImage(editor: EditorType): EditorType {
    const slideId = editor.selection.selectedObjectById
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => element.objectType == ObjectType.Image)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[slideIndex].listObjects.splice(elementIndex, 1)
    console.log(newSlides)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    removeImage,
}