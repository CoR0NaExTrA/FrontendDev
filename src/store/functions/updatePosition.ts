import { Point } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function updatePosition(editor: EditorType, newPosition: Point): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => element.id == editor.selectionObject.selectedObjectId)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[slideIndex].listObjects[elementIndex].pos = newPosition
    console.log(editor)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    updatePosition,
}