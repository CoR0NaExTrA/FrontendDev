import { v4 as uuid } from "uuid";
import { Button } from '../../components/buttons/Button'
import { addSlide } from '../../store/functions/addSlide'
import { editBackground } from '../../store/functions/editBackground'
import { editName } from '../../store/functions/editName'
import { dispatch } from '../../store/editor'
import { removeSlide } from '../../store/functions/removeSlide'
import styles from './TopPanel.module.css'
import { addText } from "../../store/functions/addText";
import { FontFormatting, ObjectType } from "../../Entities/BaseTypes";
import { addImage } from "../../store/functions/addImage";
import { removeText } from "../../store/functions/removeText";
import { removeImage } from "../../store/functions/removeImage";
import { SetStateAction, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker/ColorPicker";
import { FileUpload } from "../../components/DnD InsertImage/FileUpload";
import { BackgroundType } from "../../Entities/SlideType";
import { ExportButton } from "../../components/buttons/Export and Import/ExportButton";
import { ImportButton } from "../../components/buttons/Export and Import/ImportButton";

type TopPanelProps = {
    title: string
}

function TopPanel({title}: TopPanelProps) {
    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState('')
    const [isHoveredImage, setIsHoveredImage] = useState(false)
    const [isHoveredBackground, setIsHoveredBackground] = useState(false)
    const [isStuckImage, setIsStuckImage] = useState(false)
    const [isStuckBackground, setIsStuckBackground] = useState(false)

    const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColor(e.target.value)
    }

    const handleBase64 = (base64: string) =>  {
        setImage(base64)
    }

    const handleMouseEnterImage = () => {
        setIsHoveredImage(true)
    };
    
    const handleMouseLeaveImage = () => {
        setIsHoveredImage(false)

        if (isStuckImage) {
            return
        }
    };

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

    const handleMouseEnterBackground = () => {
        setIsHoveredBackground(true)
    }
    
    const handleMouseLeaveBackground = () => {
        setIsHoveredBackground(false)

        if (isStuckBackground) {
            return
        }
    }

    const handleImport = (data: any) => {
        localStorage.setItem("editorState", JSON.stringify(data))
        alert("Документ импортирован.")
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(editName, (event.target as HTMLInputElement).value)
    }

    function onAddSlide() {
        dispatch(addSlide, {
            id: uuid(),
            listObjects: [],
            background: {type: BackgroundType.Color, color: "ffffff"},
        })
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onEditBackground() {
        dispatch(editBackground, {type: BackgroundType.Color, color: color})
    }

    function onAddText() {
        dispatch(addText, {
            id: uuid(),
            pos: {x: 50, y: 50},
            size: {width: 100, height: 100},
            objectType: ObjectType.Text,
            fontSize: 100,
            fontFamily: 'Roboto',
            fontFormatting: FontFormatting.italic,
            fontColor: '#ffffff',
            fontBgColor: '#000000',
            value: '',
        })
    }

    function onAddImage() {
        dispatch(addImage, {
            id: uuid(),
            pos: {x: 400, y: 70},
            size: {width: 200, height: 200},
            objectType: ObjectType.Image,
            url: image,
        })
    }

    function onRemoveText() {
        dispatch(removeText)
    }

    function onRemoveImage() {
        dispatch(removeImage)
    }

    return (
        <div className={styles.topPanel}>
            <input aria-label="name" type="text" defaultValue={title} className={styles.title} onChange={onTitleChange}/>
            <div className={styles.container_buttons}>
                <Button text='Добавить слайд' onClick={onAddSlide} className={styles.button}  />
                <Button text='Удалить слайд' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Вставить текст' onClick={onAddText} className={styles.button}  />
                <div onMouseEnter={handleMouseEnterImage} onMouseLeave={handleMouseLeaveImage} className={styles.container_button_dropdown}>
                    <Button text='Вставить изображение' onClick={onAddImage} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredImage || isStuckImage) && (<FileUpload onClick={handleClickImage} onReset={handleResetImage} onBase64={handleBase64} className={styles.file_upload}/>)}
                </div>
                <Button text='Удалить текст' onClick={onRemoveText} className={styles.button}  />
                <Button text='Удалить изображение' onClick={onRemoveImage} className={styles.button}  />
                <div onMouseEnter={handleMouseEnterBackground} onMouseLeave={handleMouseLeaveBackground} className={styles.container_button_dropdown}>
                    <Button text='Изменить фон' onClick={onEditBackground} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredBackground || isStuckBackground) && (<ColorPicker onClick={handleClickBackground} onReset={handleResetBackground} value={color} onChange={handleInput} className={styles.color_picker}/>)}
                </div>
                <ImportButton className={styles.button} onImport={handleImport}/>
                <ExportButton className={styles.button}/>
            </div>
        </div>
    )
}

export {
    TopPanel
}