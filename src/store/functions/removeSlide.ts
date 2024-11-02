import { EditorType } from "../../Entities/SelectionType";

function removeSlide(editor: EditorType): EditorType {
    console.log('editor', editor)

    const removeSlideId = editor.selection.selectedObjectById
    const removeSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == removeSlideId)

    const newSlides = editor.presentation.listSlides.filter(slide => slide.id != removeSlideId)

    let newSelectedSlideId = ""
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        },
        selection: {
            selectedObjectById: newSelectedSlideId,
        },
    }
}

export {
    removeSlide,
}