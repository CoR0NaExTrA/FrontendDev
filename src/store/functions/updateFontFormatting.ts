import { EditorType } from "../SelectionType";
import { FontFormatting, ObjectType, Text } from "../BaseTypes"

function updateFontFormatting(editor: EditorType, newTextFormat: FontFormatting): EditorType {
    const slideId = editor.selectionSlide.selectedSlideId
    const slideIndex = editor.presentation.listSlides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.listSlides[slideIndex].listObjects.findIndex(element => (element.id === editor.selectionObject.selectedObjectId && element.objectType == ObjectType.Text))

    const element = editor.presentation.listSlides[slideIndex].listObjects[elementIndex];
    if (element.objectType !== ObjectType.Text) {
        console.warn("Attempted to update text on a non-text object.");
        return editor;
    }

    const textElement = element as Text; 
    const updatedTextElement: Text = {
        ...textElement,
        fontFormatting: newTextFormat,
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
    updateFontFormatting
}