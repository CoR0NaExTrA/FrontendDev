import { EditorType } from "../../store/SelectionType";
import { CreateSlide } from "../../store/SlideType";


function removeSlide(editor: EditorType): EditorType {
    const removeSlideId = editor.selectionSlide.selectedSlideId
    const removeSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == removeSlideId)

    let newSlides = editor.presentation.listSlides.filter(slide => slide.id != removeSlideId)

    if (newSlides.length === 0) {
        newSlides = [CreateSlide()];
    }

    let newSelectedSlideId = ""
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        },
        selectionSlide: {
            ...editor.selectionSlide,
            selectedSlideId: newSelectedSlideId,
        },
        selectionObject: {
            ...editor.selectionObject
        }
    }
}

export {
    removeSlide,
}