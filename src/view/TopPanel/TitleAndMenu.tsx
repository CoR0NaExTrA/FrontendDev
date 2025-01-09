import styles from './TitleAndMenu.module.css'
import { useContext, useEffect, useRef } from "react"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppActions } from "../../hooks/useAppActions"
import { HistoryContext } from "../../hooks/HistoryContext";
import { exportPresentationToPDF } from "../../store/functions/exportPDF";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import { handleAddImage, handleAddSlide, handleAddText, handleExportToPDF, handleRedo, handleRemoveImage, 
    handleRemoveSlide, handleRemoveText, handleTitleChange, handleUndo 
} from "../../utils/Handlers";
import { handleExport, handleImport } from '../../utils/FileHandlers'


function TitleAndMenu() {
    const presentation = useAppSelector((editor => editor.presentation))
    const title = useAppSelector((editor => editor.presentation.name))
    const {addSlide, removeSlide, addText, removeText, addImage, removeImage, editName, setEditor } = useAppActions()
    const history = useContext(HistoryContext)

    const downloadRef = useRef<HTMLAnchorElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const openFileDialog = () => fileInputRef.current?.click()

    const fileItems = [
        { label: 'Импорт файла', onClick: openFileDialog },
        { label: 'Загрузка файла', onClick: () => handleExport(localStorage.getItem("editorState"), downloadRef) },
        { label: 'Экспорт в PDF', onClick: () => handleExportToPDF(presentation, exportPresentationToPDF) }
    ]

    const editItems = [
        { label: 'Отменить', onClick: () => handleUndo(history, setEditor) },
        { label: 'Восстановить', onClick: () => handleRedo(history, setEditor) },
    ]

    const insertItems = [
        { label: 'Изображение', onClick: () => handleAddImage(addImage, '') },
        { label: 'Текст', onClick: () => handleAddText(addText)},
        { label: 'Удалить текст', onClick: () => handleRemoveText(removeText)},
        { label: 'Удалить изображение', onClick: () => handleRemoveImage(removeImage)},
    ]

    const slideItems = [
        { label: 'Создать слайд', onClick: () => handleAddSlide(addSlide) },
        { label: 'Дублировать слайд', onClick: () => alert('Ещё один мипо') },
        { label: 'Удалить', onClick: () => handleRemoveSlide(removeSlide) },
    ]

    const objectItems = [
        { label: 'Переместить', onClick: () => alert('Банкай') },
    ]

    return (
        <div className={styles.container_main}>
            <input aria-label="name" type="text" defaultValue={title} className={styles.title} onChange={(e) => handleTitleChange(e, editName)}/>
            <div className={styles.container_menus}>
                <DropdownMenu label="Файл" items={fileItems}/>
                <DropdownMenu label="Правка" items={editItems}/>
                <DropdownMenu label="Вставка" items={insertItems}/>
                <DropdownMenu label="Слайд" items={slideItems}/>
                <DropdownMenu label="Объект" items={objectItems}/>
            </div>
            <a ref={downloadRef} style={{ display: "none" }}>Скачать</a>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                style={{ display: "none" }}
                onChange={(e) => e.target.files && handleImport(e.target.files[0], setEditor)}
            />
        </div>
        
    )
}

export {
    TitleAndMenu
}