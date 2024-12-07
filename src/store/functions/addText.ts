import { Text } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function addText(editor: EditorType, newText: Text): EditorType {
    const addTextSlideId = editor.selectionSlide.selectedSlideId
    const addTextSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == addTextSlideId)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[addTextSlideIndex] = {...editor.presentation.listSlides[addTextSlideIndex], 
        listObjects: [...editor.presentation.listSlides[addTextSlideIndex].listObjects, newText]}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    addText,
}