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
import { removeImage } from "../../store/functions/RemoveImage";
import { SetStateAction, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker/ColorPicker";
import { FileUpload } from "../../components/DnD InsertImage/FileUpload";

type TopPanelProps = {
    title: string
}

function TopPanel({title}: TopPanelProps) {

    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState('')
    const [isHovered, setIsHovered] = useState(false)

    const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColor(e.target.value)
    }

    const handleBase64 = (base64: string) =>  {
        setImage(base64)
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function onAddSlide() {
        dispatch(addSlide, {
            id: uuid(),
            listObjects: [],
            background: "#ffffff",
        })
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(editName, (event.target as HTMLInputElement).value)
    }

    function onEditBackground() {
        dispatch(editBackground, color)
    }

    function onAddText() {
        dispatch(addText, {
            id: uuid(),
            pos: {x: 10, y: 10},
            size: {width: 10, height: 10},
            objectType: ObjectType.Text,
            fontSize: 100,
            fontFamily: 'Roboto',
            fontFormatting: FontFormatting.bold,
            fontColor: '#ffffff',
            fontBgColor: '#000000',
            value: 'Пока',
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
                <div className={styles.container_button_dropdown}>
                    <Button text='Вставить изображение' onClick={onAddImage} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    <FileUpload onBase64={handleBase64} className={styles.file_upload}/>
                </div>
                <Button text='Удалить текст' onClick={onRemoveText} className={styles.button}  />
                <Button text='Удалить изображение' onClick={onRemoveImage} className={styles.button}  />
                <div className={styles.container_button_dropdown}>
                    <Button text='Изменить фон' onClick={onEditBackground} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    <ColorPicker value={color} onChange={handleInput} className={styles.color_picker}/>
                </div>

            </div>
        </div>
    )
}

export {
    TopPanel
}