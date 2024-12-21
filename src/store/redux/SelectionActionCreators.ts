import { SelectionObject, SelectionSlide, } from "../SelectionType";
import { ActionType } from "./Actions";

function setSelectionSlide(newSelectionSlide: SelectionSlide) {
    return {
        type: ActionType.Set_Selection_Slide,
        payload: newSelectionSlide,
    }
}

function setSelectionObject(newSelectionObject: SelectionObject) {
    return {
        type: ActionType.Set_Selection_Object,
        payload: newSelectionObject,
    }
}

export {
    setSelectionObject,
    setSelectionSlide,
}