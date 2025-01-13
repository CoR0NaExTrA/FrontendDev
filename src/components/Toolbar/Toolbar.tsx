import React, { useContext, useState } from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight, FaDownload, FaPlus, FaT, FaImage} from 'react-icons/fa6';
import styles from './Toolbar.module.css';
import { TextButton } from '../buttons/TextButton';
import { Button } from '../buttons/Button';
import { getSelectedObject, handleAddImage, handleAddSlide, handleAddText, handleEditBackground, 
    handleExportToPDF, handleRedo, handleUndo, handleUploadFromComputer } from '../../utils/Handlers';
import { useAppActions } from '../../hooks/useAppActions';
import { exportPresentationToPDF } from '../../store/functions/exportPDF';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ObjectType } from '../../store/BaseTypes';
import { HistoryContext } from '../../hooks/HistoryContext';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { UnsplashModal } from '../Modals/UnsplashModal';
import { BackgroundColor, BackgroundGradient, BackgroundImage } from '../../store/SlideType';
import { BackgroundModal } from '../Modals/BackgroundModal';
import { ZoomButton } from '../buttons/ZoomButton';
import { ImageButton } from '../buttons/ImageButton';

interface ToolbarProps {
    selectedObjectType: ObjectType.Text | ObjectType.Image | 'slide' | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedObjectType }) => {
    const editor = useAppSelector((editor => editor))
    const selectedObject = getSelectedObject(editor)
    const history = useContext(HistoryContext)
    const {addSlide, addText, addImage, editBackground, setEditor } = useAppActions()
    const [isUnsplashModalOpen, setIsUnsplashModalOpen] = useState(false)
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false)

    const handleSearchOnline = () => {
        setIsUnsplashModalOpen(true)
    }

    const handleSelectImage = (url: string) => {
        handleAddImage(addImage, url)
        setIsUnsplashModalOpen(false)
    }

    const handleInsertURL = () => {
        const url = prompt('Введите URL изображения:');
        if (url) {
            handleAddImage(addImage, url)
        }
    }

    const handleApplyColor = (background: BackgroundColor) => {
        handleEditBackground(editBackground, background)
    }

    const handleApplyGradient = (background: BackgroundGradient) => {
        handleEditBackground(editBackground, background)
    }

    const handleApplyImage = (background: BackgroundImage) => {
        handleEditBackground(editBackground, background)
    }

    const imageItems = [
        { label: 'Загрузить с компьютера', onClick: () => handleUploadFromComputer(addImage) },
        { label: 'Найти в Интернете', onClick: handleSearchOnline },
        { label: 'Вставить URL', onClick: handleInsertURL }
    ]
    
    return (
        <div className={styles.toolbar}>
            <Button text={<FaPlus />} onClick={() => handleAddSlide(addSlide)} className={styles.button}  />
            <Button text={<FaArrowRotateLeft />} onClick={() => handleUndo(history, setEditor)} className={styles.button}  />
            <Button text={<FaArrowRotateRight />} onClick={() => handleRedo(history, setEditor)} className={styles.button}  />
            <ZoomButton />
            <Button text={<FaDownload />} onClick={() => handleExportToPDF(editor.presentation, exportPresentationToPDF)} className={styles.button}  />
            <Button text={<FaT />} onClick={() => {handleAddText(addText)}} className={styles.button}  />
            <DropdownMenu label={<FaImage/>} items={imageItems}/>
            {selectedObjectType === ObjectType.Text && (
                <TextButton currentFontSize={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontSize : 16}
                    currentFontFamily={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontFamily : "Arial"}
                    currentFontColor={selectedObject?.objectType === ObjectType.Text ? selectedObject.fontFamily : "#000000"}
                />
            )}
            {selectedObjectType === ObjectType.Image && (
                <ImageButton/>
            )}
            {selectedObjectType === 'slide' && (
                <Button text="Фон" className='' onClick={() => setIsBackgroundModalOpen(true)}/>
            )}
            {isUnsplashModalOpen && <UnsplashModal onClose={() => setIsUnsplashModalOpen(false)} onSelectImage={handleSelectImage} />}
            {isBackgroundModalOpen && 
                <BackgroundModal onClose={() => setIsBackgroundModalOpen(false)} onApplyColor={handleApplyColor} 
                    onApplyImage={handleApplyImage} onApplyGradient={handleApplyGradient}/>
            }
        </div>
    );
};

export {
    Toolbar
};


