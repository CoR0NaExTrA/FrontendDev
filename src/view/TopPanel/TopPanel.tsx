import { v4 as uuid } from "uuid";
import { Button } from '../../components/buttons/Button'
import styles from './TopPanel.module.css'
import { SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { ColorPicker } from "../../components/ColorPicker/ColorPicker"
import { FileUpload } from "../../components/DnD InsertImage/FileUpload"
import { ExportButton } from "../../components/buttons/Export and Import/ExportButton"
import { ImportButton } from "../../components/buttons/Export and Import/ImportButton"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppActions } from "../hooks/useAppActions"
import { FontFormatting, ObjectType } from '../../store/BaseTypes'
import { BackgroundType } from '../../store/SlideType'
import { HistoryContext } from "../hooks/HistoryContext";
import { exportPresentationToPDF } from "../../store/functions/exportPDF";
import { FaPlus, FaT, FaTrash, FaArrowRotateLeft, FaArrowRotateRight, FaDownload, FaFileImage, FaPalette } from 'react-icons/fa6';

function TopPanel() {
    const presentation = useAppSelector((editor => editor.presentation))
    const title = useAppSelector((editor => editor.presentation.name))
    const {addSlide, removeSlide, addText, removeText, addImage, removeImage, editBackground, editName, setEditor } = useAppActions()
    const history = useContext(HistoryContext)

    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState('')
    const [isHoveredImage, setIsHoveredImage] = useState(false)
    const [isHoveredBackground, setIsHoveredBackground] = useState(false)
    const [isStuckImage, setIsStuckImage] = useState(false)
    const [isStuckBackground, setIsStuckBackground] = useState(false)
    const topPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (topPanelRef.current) {
            topPanelRef.current.focus();
        }
    }, []);

    const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColor(e.target.value)
    }

    const handleBase64 = (base64: string) =>  {
        setImage(base64)
    }

    const handleContextMenuImage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHoveredImage(true)
    }

    const handleClickImage = () => {
        setIsStuckImage(true)
    }
    
    const handleResetImage = () => {
        setIsStuckImage(false)
        setIsHoveredImage(false)
    }

    const handleClickBackground = () => {
        setIsStuckBackground(true)
    }
    
    const handleResetBackground = () => {
        setIsStuckBackground(false)
        setIsHoveredBackground(false)
    }

    const handleContextMenuBackground = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHoveredBackground(true)
    }

    const handleImport = (data: any) => {
        localStorage.setItem("editorState", JSON.stringify(data))
        alert("Документ импортирован.")
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        editName((event.target as HTMLInputElement).value)
    }

    function handleExportToPDF() {
        if (!presentation.name || presentation.name.trim() === "") {
            alert("Имя презентации не указано. Используется имя по умолчанию: 'presentation'.");
        }
        
        exportPresentationToPDF(presentation);
    }

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.code === "KeyZ") {
            event.preventDefault();
            onUndo();
        }
        if (event.ctrlKey && event.code === "KeyY") {
            event.preventDefault();
            onRedo();
        }
    };

    function onAddText() {
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

    function onAddImage() {
        addImage({
            id: uuid(),
            pos: {x: 400, y: 70},
            size: {width: 200, height: 200},
            objectType: ObjectType.Image,
            url: image,
        })
    }

    function onEditBackground() {
        editBackground({
            type: BackgroundType.Color,
            color: color,
        })
    }

    return (
        <div ref={topPanelRef} className={styles.topPanel} tabIndex={0} onKeyDown={handleKeyDown}>
            <input aria-label="name" type="text" defaultValue={title} className={styles.title} onChange={onTitleChange}/>
            <div className={styles.container_buttons}>
                <Button text={<FaPlus />} onClick={addSlide} className={styles.button}  />
                <Button text={<FaTrash />} onClick={removeSlide} className={styles.button}  />
                <Button text={<FaT />} onClick={onAddText} className={styles.button}  />
                <div onContextMenu={(e) => handleContextMenuImage(e)} className={styles.container_button_dropdown}>
                    <Button text={<FaFileImage size={20}/>} onClick={onAddImage} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredImage || isStuckImage) && (<FileUpload onClick={handleClickImage} onReset={handleResetImage} onBase64={handleBase64} className={styles.file_upload}/>)}
                </div>
                <Button text='Удалить текст' onClick={removeText} className={styles.button}  />
                <Button text='Удалить изображение' onClick={removeImage} className={styles.button}  />
                <div onContextMenu={(e) => handleContextMenuBackground(e)} className={styles.container_button_dropdown}>
                    <Button text={<FaPalette size={20}/>} onClick={onEditBackground} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredBackground || isStuckBackground) && (<ColorPicker onClick={handleClickBackground} onReset={handleResetBackground} value={color} onChange={handleInput} className={styles.color_picker}/>)}
                </div>
                <ImportButton className={`${styles.button} ${styles.button_with_dropdown}`} onImport={handleImport}/>
                <ExportButton className={styles.button}/>
                <Button text={<FaArrowRotateLeft />} onClick={onUndo} className={styles.button}  />
                <Button text={<FaArrowRotateRight />} onClick={onRedo} className={styles.button}  />
                <Button text={<FaDownload />} onClick={handleExportToPDF} className={styles.button}  />
            </div>
        </div>
    )
}

export {
    TopPanel
}