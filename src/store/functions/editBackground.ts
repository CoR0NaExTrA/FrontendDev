import { EditorType } from "../../store/SelectionType"
import { BackgroundSlide } from "../../store/SlideType"


function editBackground(editor: EditorType, newBackground: BackgroundSlide): EditorType {
    const editBackgroundSlideId = editor.selectionSlide.selectedSlideId
    const editBackgroundSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == editBackgroundSlideId)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[editBackgroundSlideIndex] = {...editor.presentation.listSlides[editBackgroundSlideIndex], background: newBackground}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides
        }
    }
}

export {
    editBackground,
}