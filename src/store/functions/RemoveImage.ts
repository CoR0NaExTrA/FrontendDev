import { ObjectType } from "../../Entities/BaseTypes"
import { EditorType } from "../../Entities/SelectionType"


function removeImage(editor: EditorType): EditorType {
    console.log('editor', editor)

    const removeImageId = editor.selection.selectedObjectById
    const removeImageIndex = editor.presentation.listSlides.findIndex(slide => slide.id == removeImageId)

    const imageIndex = editor.presentation.listSlides[removeImageIndex].listObjects.findIndex(object => object.objectType == ObjectType.Image)

    const newSlides = editor.presentation.listSlides
    newSlides[removeImageIndex].listObjects.splice(imageIndex, 1)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides,
        }
    }
}

export {
    removeImage,
}