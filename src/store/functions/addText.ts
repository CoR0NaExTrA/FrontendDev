import { Text } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function addText(editor: EditorType, newText: Text): EditorType {
    console.log("editor", editor)
    if (!editor.selection) {
        return editor
    }

    const addTextSlideId = editor.selection.selectedObjectById
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