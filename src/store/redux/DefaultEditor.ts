import { EditorType, SelectionType } from "../SelectionType"
import { CreateSlide } from "../SlideType"

const slide = CreateSlide()
const defaultEditor: EditorType = {
    presentation: {
        name: 'Ваша презентация',
        listSlides: [slide]
    },
    selectionSlide: {
        type: SelectionType.Slide,
        selectedSlideId: slide.id,
    },
    selectionObject: {
        type: SelectionType.Object,
        selectedObjectId: '',
    }
}

export {
    defaultEditor
}