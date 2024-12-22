import { v4 as uuid } from "uuid";
import { FontFormatting, ObjectType } from "../store/BaseTypes";
import { BackgroundType } from "../store/SlideType";
import { SetStateAction } from "react";
import { EditorType } from "../store/SelectionType";

export const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, editName: (name: string) => void) => {
    editName(event.target.value);
};

// Функции для добавления/удаления объектов
export const handleAddSlide = (addSlide: () => void) => {
    addSlide();
};

export const handleRemoveSlide = (removeSlide: () => void) => {
    removeSlide();
};

export const handleAddText = (addText: (text: any) => void) => {
    addText({
        id: uuid(),
        pos: {x: 10, y: 10},
        size: {width: 100, height: 100},
        objectType: ObjectType.Text,
        fontSize: 100,
        fontFamily: 'Roboto',
        fontFormatting: FontFormatting.italic,
        fontColor: '#0000ff',
        fontBgColor: '#ffffff',
        value: '',
    });
};

export const handleAddImage = (addImage: (image: any) => void, image: string) => {
    addImage({
        id: uuid(),
        pos: {x: 400, y: 70},
        size: {width: 200, height: 200},
        objectType: ObjectType.Image,
        url: image,
    });
};

export const handleRemoveText = (removeText: () => void) => {
    removeText();
};

export const handleRemoveImage = (removeImage: () => void) => {
    removeImage();
};

// Функции для работы с фоном
export const handleEditBackground = (editBackground: (background: any) => void, color: string) => {
    editBackground({
        type: BackgroundType.Color,
        color: color,
    });
};

// Обработчики для изображений
export const handleContextMenuImage = (e: React.MouseEvent<HTMLDivElement>, setIsHoveredImage: React.Dispatch<SetStateAction<boolean>>, setIsStuckImage: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault();
    setIsHoveredImage(true);
    setIsStuckImage(true);
};

export const handleResetImage = (setIsHoveredImage: React.Dispatch<SetStateAction<boolean>>, setIsStuckImage: React.Dispatch<SetStateAction<boolean>>) => {
    setIsStuckImage(false);
    setIsHoveredImage(false);
};

// Обработчики для фона
export const handleContextMenuBackground = (e: React.MouseEvent<HTMLDivElement>, setIsHoveredBackground: React.Dispatch<SetStateAction<boolean>>, setIsStuckBackground: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault();
    setIsHoveredBackground(true);
    setIsStuckBackground(true);
};

export const handleResetBackground = (setIsHoveredBackground: React.Dispatch<SetStateAction<boolean>>, setIsStuckBackground: React.Dispatch<SetStateAction<boolean>>) => {
    setIsStuckBackground(false);
    setIsHoveredBackground(false);
};

// Обработчики импорта и экспорта
export const handleImport = (data: any) => {
    localStorage.setItem("editorState", JSON.stringify(data));
    alert("Документ импортирован.");
};

export const handleExportToPDF = (presentation: any, exportPresentationToPDF: (presentation: any) => void) => {
    if (!presentation.name || presentation.name.trim() === "") {
        alert("Имя презентации не указано. Используется имя по умолчанию: 'presentation'.");
    }
    exportPresentationToPDF(presentation);
};

// Обработчики для Undo и Redo
export const handleUndo = (history: any, setEditor: any) => {
    const newEditor = history.undo();
    if (newEditor) {
        setEditor(newEditor);
    }
};

export const handleRedo = (history: any, setEditor: any) => {
    const newEditor = history.redo();
    if (newEditor) {
        setEditor(newEditor);
    }
};

export const getSelectedObject = (editor: EditorType) => {
    const slide = editor.presentation.listSlides.find(
        (slide) => slide.id === editor.selectionSlide.selectedSlideId
    );
    if (!slide) return null;

    return slide.listObjects.find(
        (object) => object.id === editor.selectionObject.selectedObjectId
    );
}