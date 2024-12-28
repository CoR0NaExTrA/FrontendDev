import { v4 as uuid } from "uuid";
import { FontFormatting, Image, Text, ObjectType } from "../store/BaseTypes";
import { BackgroundSlide } from "../store/SlideType";
import { SetStateAction } from "react";
import { EditorType } from "../store/SelectionType";
import { HistoryType } from "./History";

export const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, editName: (name: string) => void) => {
    editName(event.target.value)
}

export const handleAddSlide = (addSlide: () => void) => {
    addSlide()
}

export const handleRemoveSlide = (removeSlide: () => void) => {
    removeSlide()
}

export const handleAddText = (addText: (text: Text) => void) => {
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
    })
}

export const handleAddImage = (addImage: (image: Image) => void, image: string) => {
    addImage({
        id: uuid(),
        pos: {x: 400, y: 70},
        size: {width: 200, height: 200},
        objectType: ObjectType.Image,
        url: image,
    })
}

export const handleRemoveText = (removeText: () => void) => {
    removeText()
}

export const handleRemoveImage = (removeImage: () => void) => {
    removeImage()
}

export const handleEditBackground = (editBackground: (background: BackgroundSlide) => void, background: BackgroundSlide) => {
    editBackground(background);
};

export const handleContextMenuImage = (e: React.MouseEvent<HTMLDivElement>, setIsHoveredImage: React.Dispatch<SetStateAction<boolean>>, setIsStuckImage: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault()
    setIsHoveredImage(true)
    setIsStuckImage(true)
}

export const handleResetImage = (setIsHoveredImage: React.Dispatch<SetStateAction<boolean>>, setIsStuckImage: React.Dispatch<SetStateAction<boolean>>) => {
    setIsStuckImage(false);
    setIsHoveredImage(false);
};

export const handleContextMenuBackground = (e: React.MouseEvent<HTMLDivElement>, setIsHoveredBackground: React.Dispatch<SetStateAction<boolean>>, setIsStuckBackground: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault()
    setIsHoveredBackground(true)
    setIsStuckBackground(true)
}

export const handleResetBackground = (setIsHoveredBackground: React.Dispatch<SetStateAction<boolean>>, setIsStuckBackground: React.Dispatch<SetStateAction<boolean>>) => {
    setIsStuckBackground(false)
    setIsHoveredBackground(false)
}

export const handleImport = (data: any) => {
    localStorage.setItem("editorState", JSON.stringify(data))
    alert("Документ импортирован.")
}

export const handleExportToPDF = (presentation: any, exportPresentationToPDF: (presentation: any) => void) => {
    if (!presentation.name || presentation.name.trim() === "") {
        alert("Имя презентации не указано. Используется имя по умолчанию: 'presentation'.")
    }
    exportPresentationToPDF(presentation)
}

export const handleUndo = (history: HistoryType, setEditor: any) => {
    const newEditor = history.undo()
    if (newEditor) {
        setEditor(newEditor)
    }
}

export const handleRedo = (history: HistoryType, setEditor: any) => {
    const newEditor = history.redo()
    if (newEditor) {
        setEditor(newEditor)
    }
}

export const getSelectedObject = (editor: EditorType) => {
    const slide = editor.presentation.listSlides.find(
        (slide) => slide.id === editor.selectionSlide.selectedSlideId
    )
    if (!slide) return null

    return slide.listObjects.find(
        (object) => object.id === editor.selectionObject.selectedObjectId
    )
}

export const handleUploadFromComputer = (addImage: (image: Image) => void) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const base64Image = reader.result as string;
                handleAddImage(addImage, base64Image);
            }
            reader.readAsDataURL(file)
        }
    }
    input.click();
}