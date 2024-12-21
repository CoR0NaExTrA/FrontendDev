import { ObjectType } from "../../store/BaseTypes"
import { EditorType } from "../../store/SelectionType"


function removeText(editor: EditorType): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)
    
    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => 
        element.id == editor.selectionObject.selectedObjectId && 
        element.objectType == ObjectType.Text
    )

    if (elementIndex === -1) {
        alert("Element not found");
        return editor;
    }

    const newSlides = [...editor.presentation.listSlides]
    newSlides[slideIndex].listObjects.splice(elementIndex, 1)
    console.log(newSlides)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    removeText,
}