import { addImage } from "../functions/addImage";
import { addSlide } from "../functions/addSlide";
import { addText } from "../functions/addText";
import { editBackground } from "../functions/editBackground";
import { removeImage } from "../functions/removeImage";
import { removeSlide } from "../functions/removeSlide";
import { removeText } from "../functions/removeText";
import { setSelectionObject } from "../functions/setSelectionObject";
import { setSelectionSlide } from "../functions/setSelectionSlide";
import { updateSize } from "../functions/updateSize";
import { updatePosition } from "../functions/updatePosition";
import { EditorType } from "../SelectionType";
import { ActionType, EditorAction } from "./Actions";
import { defaultEditor } from "./DefaultEditor";
import { updateText } from "../functions/updateText";
import { updateSlides } from "../functions/updateSlides";
import { editName } from "../functions/editName";
import { updateFontColor } from "../functions/updateFontColor";
import { updateFontSize } from "../functions/updateFontSize";
import { updateFontFamily } from "../functions/updateFontFamily";
import { updateFontFormatting } from "../functions/updateFontFormatting";

function EditorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.Add_Slide:
            return addSlide(editor);
        case ActionType.Remove_Slide:
            return removeSlide(editor);
        case ActionType.Add_Text:
            return addText(editor, action.payload);
        case ActionType.Add_Image:
            return addImage(editor, action.payload);
        case ActionType.Remove_Text:
            return removeText(editor);
        case ActionType.Remove_Image:
            return removeImage(editor);
        case ActionType.Update_Font_Color_Action:
            return updateFontColor(editor, action.payload);
        case ActionType.Update_Font_Family_Action:
            return updateFontFamily(editor, action.payload);
        case ActionType.Update_Font_Size_Action:
            return updateFontSize(editor, action.payload);
        case ActionType.Update_Font_Formatting_Action:
            return updateFontFormatting(editor, action.payload);
        case ActionType.Edit_Background:
            return editBackground(editor, action.payload);
        case ActionType.Edit_Name:
            return editName(editor, action.payload);
        case ActionType.Update_Position:
            return updatePosition(editor, action.payload);
        case ActionType.Update_Size:
            return updateSize(editor, action.payload);
        case ActionType.Update_Text:
            return updateText(editor, action.payload);
        case ActionType.Update_Slides:
            return updateSlides(editor, action.payload);
        case ActionType.Set_Selection_Object:
            return setSelectionObject(editor, action.payload);
        case ActionType.Set_Selection_Slide:
            return setSelectionSlide(editor, action.payload);
        case ActionType.Set_Editor:
            return action.payload;
        default:
            return editor;
    }
}

export {
    EditorReducer
}