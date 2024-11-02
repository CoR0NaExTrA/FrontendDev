import { v4 as uuid } from "uuid";
import { Button } from '../../components/Button'
import { addSlide } from '../../store/addSlide'
import { editBackground } from '../../store/editBackground'
import { editName } from '../../store/editName'
import { dispatch } from '../../store/editor'
import { removeSlide } from '../../store/removeSlide'
import styles from './TopPanel.module.css'

type TopPanelProps = {
    title: string
}

function TopPanel({title}: TopPanelProps) {

    function onAddSlide() {
        dispatch(addSlide, {
            id: uuid(),
            listObjects: [],
            background: {type: "color", color: "#000000"},
        })
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(editName, (event.target as HTMLInputElement).value)
    }

    function onEditBackground() {
        dispatch(editBackground, )
    }

    return (
        <div className={styles.topPanel}>
            <input aria-label="name" type="text" defaultValue={title} className={styles.title} onChange={onTitleChange}/>
            <div>
                <Button text='Добавить слайд' onClick={onAddSlide} className={styles.button}  />
                <Button text='Удалить слайд' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Вставить текст' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Вставить изображение' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Удалить текст' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Удалить изображение' onClick={onRemoveSlide} className={styles.button}  />
                <Button text='Изменить фон' onClick={onEditBackground} className={styles.button}  />
            </div>
        </div>
    )
}

export {
    TopPanel
}