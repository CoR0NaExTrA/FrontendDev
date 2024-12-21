import { Size } from "../../store/BaseTypes"
import { EditorType } from "../../store/SelectionType"


function updateSize(editor: EditorType, newSize: Size): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => element.id == editor.selectionObject.selectedObjectId)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[slideIndex].listObjects[elementIndex].size = newSize
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    updateSize,
}