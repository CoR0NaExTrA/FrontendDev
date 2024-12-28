import { FontFormatting, Image, Point, Size, Text } from "../BaseTypes"
import { EditorType, SelectionObject, SelectionSlide } from "../SelectionType"
import { BackgroundSlide, SlideType } from "../SlideType"

export enum ActionType {
    Add_Slide = 'addSlide',
    Remove_Slide = 'removeSlide',
    Add_Text = 'addText',
    Add_Image = 'addImage',
    Remove_Text = 'removeText',
    Update_Font_Color_Action = 'updateFontColor',
    Update_Font_Family_Action = 'updateFontFamily',
    Update_Font_Size_Action = 'updateFontSize',
    Update_Font_Formatting_Action = 'updateFontFormatting',
    Remove_Image = 'removeImage',
    Edit_Background = 'editBackground',
    Edit_Name = 'editName',
    Update_Position = 'updatePosition',
    Update_Size = 'updateSize',
    Update_Text = 'updateText',
    Update_Slides = 'updateSlides',
    Set_Selection_Slide = 'setSelectionSlide',
    Set_Selection_Object = 'setSelectionObject',
    Set_Editor = 'setEditor',
}

type AddSlideAction = {
    type: ActionType.Add_Slide,
}

type RemoveSlideAction = {
    type: ActionType.Remove_Slide,
}

type AddTextAction = {
    type: ActionType.Add_Text,
    payload: Text,
}

type AddImageAction = {
    type: ActionType.Add_Image,
    payload: Image,
}

type RemoveTextAction = {
    type: ActionType.Remove_Text,
}

type UpdateFontColorAction = {
    type: ActionType.Update_Font_Color_Action,
    payload: string,
}

type UpdateFontFamilyAction = {
    type: ActionType.Update_Font_Family_Action,
    payload: string,
}

type UpdateFontSizeAction = {
    type: ActionType.Update_Font_Size_Action,
    payload: number,
}

type UpdateFontFormattingAction = {
    type: ActionType.Update_Font_Formatting_Action,
    payload: FontFormatting,
}

type RemoveImageAction = {
    type: ActionType.Remove_Image,
}

type EditBackgroundAction = {
    type: ActionType.Edit_Background,
    payload: BackgroundSlide,
}

type EditNameAction = {
    type: ActionType.Edit_Name,
    payload: string,
}

type UpdatePosition = {
    type: ActionType.Update_Position,
    payload: Point,
}

type UpdateSize = {
    type: ActionType.Update_Size,
    payload: Size,
}

type UpdateText = {
    type: ActionType.Update_Text,
    payload: string,
}

type UpdateSlides = {
    type: ActionType.Update_Slides,
    payload: SlideType[],
}

export type SetSelectionActionSlide = {
    type: ActionType.Set_Selection_Slide,
    payload: SelectionSlide,
}

export type SetSelectionActionObject = {
    type: ActionType.Set_Selection_Object,
    payload: SelectionObject,
}

type SetEditorAction = {
    type: ActionType.Set_Editor,
    payload: EditorType
}

export type EditorAction = 
    AddSlideAction | RemoveSlideAction | AddTextAction | 
    AddImageAction | RemoveTextAction | RemoveImageAction | 
    UpdateFontColorAction | UpdateFontFamilyAction | UpdateFontSizeAction |
    UpdateFontFormattingAction | EditBackgroundAction | EditNameAction | 
    UpdatePosition | UpdateSize | UpdateText | UpdateSlides | 
    SetSelectionActionSlide | SetSelectionActionObject | SetEditorAction
