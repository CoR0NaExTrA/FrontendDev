import { Id } from "./BaseTypes";
import { Presentation } from "./Presentation";

export type SelectionType = {
    selectedObjectById: Id;
};

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType,
}