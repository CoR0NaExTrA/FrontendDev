import { SlideType } from "../SlideType";
import { ActionType } from "./Actions";

function updateSlides(slides: Array<SlideType>) {
    return {
        type: ActionType.Update_Text,
        payload: slides,
    }
}

function editName(name: string) {
    return {
        type: ActionType.Edit_Name,
        payload: name,
    }
}

export {
    updateSlides, editName
}