import { EditorType } from "../../Entities/SelectionType"


function editBackground(editor: EditorType, newBackground: string): EditorType {
    if (!editor.selection) {
        return editor
    }

    const editBackgroundSlideId = editor.selection.selectedSlideById
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