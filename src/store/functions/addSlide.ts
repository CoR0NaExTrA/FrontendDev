import { EditorType } from "../../store/SelectionType"
import { CreateSlide, SlideType } from "../../store/SlideType"


function addSlide(editor: EditorType): EditorType {
    const selectedSlideId = editor.selectionSlide.selectedSlideId;
    const newSlide = CreateSlide()

    const selectedIndex = editor.presentation.listSlides.findIndex(
        (slide) => slide.id === selectedSlideId
    );

    const insertIndex = selectedIndex !== -1 ? selectedIndex + 1 : editor.presentation.listSlides.length;

    const newSlides = [
        ...editor.presentation.listSlides.slice(0, insertIndex),
        newSlide,
        ...editor.presentation.listSlides.slice(insertIndex),
    ];
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newSlides
        },
        selectionSlide: {
            ...editor.selectionSlide,
            selectedSlideId: newSlide.id
        }
    }
}

export {
    addSlide,
}