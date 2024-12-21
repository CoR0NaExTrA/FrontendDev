import { Point } from "../../store/BaseTypes"
import { EditorType } from "../../store/SelectionType"


function updatePosition(editor: EditorType, newPosition: Point): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => element.id === editor.selectionObject.selectedObjectId)

    const newSlides = [...editor.presentation.listSlides]
    const updatedObjects = [...newSlides[slideIndex].listObjects]
    updatedObjects[elementIndex] = { 
        ...updatedObjects[elementIndex], 
        pos: newPosition
    }
    newSlides[slideIndex] = { 
        ...newSlides[slideIndex], 
        listObjects: updatedObjects 
    }
    
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