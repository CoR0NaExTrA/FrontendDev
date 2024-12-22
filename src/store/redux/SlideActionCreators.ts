import { FontFormatting, Image, Point, Size, Text } from "../BaseTypes";
import { BackgroundSlide } from "../SlideType";
import { ActionType } from "./Actions";

function addSlide() {
    return {
        type: ActionType.Add_Slide,
    }
}

function removeSlide() {
    return {
        type: ActionType.Remove_Slide,
    }
}

function addText(text: Text) {
    return {
        type: ActionType.Add_Text,
        payload: text,
    }
}

function removeText() {
    return {
        type: ActionType.Remove_Text,
    }
}

function updateFontColor(color: string) {
    return {
        type: ActionType.Update_Font_Color_Action,
        payload: color,
    }
}

function updateFontFamily(family: string) {
    return {
        type: ActionType.Update_Font_Family_Action,
        payload: family,
    }
}

function updateFontSize(size: number) {
    return {
        type: ActionType.Update_Font_Size_Action,
        payload: size,
    }
}

function updateFontFormatting(format: FontFormatting) {
    return {
        type: ActionType.Update_Font_Formatting_Action,
        payload: format,
    }
}

function addImage(image: Image) {
    return {
        type: ActionType.Add_Image,
        payload: image,
    }
}

function removeImage() {
    return {
        type: ActionType.Remove_Image,
    }
}

function editBackground(background: BackgroundSlide) {
    return {
        type: ActionType.Edit_Background,
        payload: background,
    }
}

function updatePosition(pos: Point) {
    return {
        type: ActionType.Update_Position,
        payload: pos,
    }
}

function updateSize(size: Size) {
    return {
        type: ActionType.Update_Size,
        payload: size,
    }
}

function updateText(value: string) {
    return {
        type: ActionType.Update_Text,
        payload: value,
    }
}

export {
    addSlide, removeSlide,
    addText, removeText,
    addImage, removeImage,
    updateFontColor, updateFontFamily,
    updateFontSize, updateFontFormatting, 
    editBackground, updatePosition, 
    updateSize, updateText
}