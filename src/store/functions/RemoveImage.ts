import { ObjectType } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"
import { dispatch } from "../editor"
import { addSlide } from "./addSlide"
import { addText } from "./addText"


function removeImage(editor: EditorType): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => (element.id === editor.selectionObject.selectedObjectId && element.objectType === ObjectType.Image))

    const newSlides = [...editor.presentation.listSlides]
    newSlides[slideIndex].listObjects.splice(elementIndex, 1)
    
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