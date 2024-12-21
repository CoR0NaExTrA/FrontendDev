import { Id } from "./BaseTypes";
import { Presentation } from "./Presentation";

export enum SelectionType {
    Slide,
    Object
}

export type SelectionSlide = {
    type: SelectionType.Slide;
    selectedSlideId: Id;
}

export type SelectionObject = {
    type: SelectionType.Object;
    selectedObjectId: Id;
}

export type EditorType = {
    presentation: Presentation,
    selectionSlide: SelectionSlide,
    selectionObject: SelectionObject,
}