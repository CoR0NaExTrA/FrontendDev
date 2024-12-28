import { ObjectType, Text } from "../../store/BaseTypes"
import { EditorType } from "../../store/SelectionType"


function updateText(editor: EditorType, newText: string): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)
    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => (element.id === editor.selectionObject.selectedObjectId && element.objectType == ObjectType.Text))

    const element = editor.presentation.listSlides[slideIndex].listObjects[elementIndex];

    const textElement = element as Text; 
    const updatedTextElement: Text = {
        ...textElement,
        value: newText,
    };

    const newSlides = [...editor.presentation.listSlides]
    const updatedObjects = [...newSlides[slideIndex].listObjects]
    updatedObjects[elementIndex] = updatedTextElement
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
    updateText,
}