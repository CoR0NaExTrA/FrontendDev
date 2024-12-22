import { Button } from '../../components/buttons/Button'
import styles from './TopPanel.module.css'
import { SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { ColorPicker } from "../../components/ColorPicker/ColorPicker"
import { FileUpload } from "../../components/DnD InsertImage/FileUpload"
import { Toolbar } from './Toolbar';
import { ExportButton } from "../../components/buttons/Export and Import/ExportButton"
import { ImportButton } from "../../components/buttons/Export and Import/ImportButton"
import { useAppActions } from "../hooks/useAppActions"
import { HistoryContext } from "../hooks/HistoryContext";
import { FaT, FaFileImage, FaPalette } from 'react-icons/fa6';
import { handleAddText, handleAddImage, handleRemoveText, handleRemoveImage, handleEditBackground, handleContextMenuImage,
    handleResetImage, handleContextMenuBackground, handleResetBackground, handleImport, handleUndo, handleRedo} from '../../utils/Handlers';
import { TitleAndMenu } from './TitleAndMenu'

function TopPanel() {
    const { addText, removeText, addImage, removeImage, editBackground, setEditor } = useAppActions()
    const history = useContext(HistoryContext)

    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState('')
    const [isHoveredImage, setIsHoveredImage] = useState(false)
    const [isHoveredBackground, setIsHoveredBackground] = useState(false)
    const [isStuckImage, setIsStuckImage] = useState(false)
    const [isStuckBackground, setIsStuckBackground] = useState(false)
    const topPanelRef = useRef<HTMLDivElement>(null);
    const [selectedObjectType, setSelectedObjectType] = useState<'text' | 'image' | 'shape' | 'slide' | null>('text');


    useEffect(() => {
        if (topPanelRef.current) {
            topPanelRef.current.focus();
        }
    }, []);

    const handleObjectSelection = (type: 'text' | 'image' | 'shape' | 'slide' | null) => {
        setSelectedObjectType(type);
    };

    const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setColor(e.target.value)
    }

    const handleBase64 = (base64: string) =>  {
        setImage(base64)
    }

    const handleClickImage = () => {
        setIsStuckImage(true)
    }

    const handleClickBackground = () => {
        setIsStuckBackground(true)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.ctrlKey && event.code === "KeyZ") {
            event.preventDefault();
            handleUndo(history, setEditor);
        }
        if (event.ctrlKey && event.code === "KeyY") {
            event.preventDefault();
            handleRedo(history, setEditor);
        }
    };

    return (
        <div ref={topPanelRef} className={styles.topPanel} tabIndex={0} onKeyDown={handleKeyDown}>
            <TitleAndMenu color={color} image={image} />
            <Toolbar selectedObjectType={selectedObjectType} />
            <div className={styles.container_buttons}>
                <div onContextMenu={(e) => handleContextMenuImage(e, setIsHoveredImage, setIsStuckImage)} className={styles.container_button_dropdown}>
                    <Button text={<FaFileImage size={20}/>} onClick={() => {handleAddImage(addImage, image); handleObjectSelection('image')}} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredImage || isStuckImage) && (<FileUpload onClick={() => handleClickImage()} onReset={() => handleResetImage(setIsHoveredImage, setIsStuckImage)} onBase64={handleBase64} className={styles.file_upload}/>)}
                </div>
                <div onContextMenu={(e) => handleContextMenuBackground(e, setIsHoveredBackground, setIsStuckBackground)} className={styles.container_button_dropdown}>
                    <Button text={<FaPalette size={20}/>} onClick={() => {handleEditBackground(editBackground, color); handleObjectSelection('slide')}} className={`${styles.container} ${styles.button_with_dropdown}`}  />
                    {(isHoveredBackground || isStuckBackground) && (<ColorPicker onClick={() => handleClickBackground()} onReset={() => handleResetBackground(setIsHoveredBackground, setIsStuckBackground)} value={color} onChange={handleInput} className={styles.color_picker}/>)}
                </div>
                <ImportButton className={`${styles.button} ${styles.button_with_dropdown}`} onImport={handleImport}/>
                <ExportButton className={styles.button}/>
            </div>
        </div>
    )
}

export {
    TopPanel
}