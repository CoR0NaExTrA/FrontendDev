import { Image } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"

function addImage(editor: EditorType, newImage: Image): EditorType {
    console.log("editor", editor)
    if (!editor.selection) {
        return editor
    }

    const addTextSlideId = editor.selection.selectedSlideById
    const addTextSlideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == addTextSlideId)

    const newSlides = [...editor.presentation.listSlides]
    newSlides[addTextSlideIndex] = {...editor.presentation.listSlides[addTextSlideIndex], 
        listObjects: [...editor.presentation.listSlides[addTextSlideIndex].listObjects, newImage]}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    addImage,
}
