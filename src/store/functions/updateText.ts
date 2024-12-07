import { ObjectType } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"
import { ElementSlide } from "../../Entities/SlideType"


function updateText(editor: EditorType, newText: string): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => element.id === editor.selectionObject.selectedObjectId)

    const newSlides = [...editor.presentation.listSlides]
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    updateText,
}