import React, { useContext, useState } from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight, FaDownload, FaPlus, FaT, FaFileImage} from 'react-icons/fa6';
import styles from './Toolbar.module.css';
import { TextButton } from '../../components/buttons/TextButton';
import { Button } from '../../components/buttons/Button';
import { getSelectedObject, handleAddImage, handleAddSlide, handleAddText, handleExportToPDF, handleRedo, handleUndo, handleUploadFromComputer } from '../../utils/Handlers';
import { useAppActions } from '../../hooks/useAppActions';
import { exportPresentationToPDF } from '../../store/functions/exportPDF';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ObjectType } from '../../store/BaseTypes';
import { HistoryContext } from '../../hooks/HistoryContext';
import { DropdownMenu } from '../../components/DropdownMenu/DropdownMenu';
import { UniversalModal } from './UnsplashModal';

interface ToolbarProps {
    selectedObjectType: 'text' | 'image' | 'shape' | 'slide' | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedObjectType }) => {
    const editor = useAppSelector((editor => editor))
    const selectedObject = getSelectedObject(editor)
    const history = useContext(HistoryContext)
    const {addSlide, addText, addImage, setEditor } = useAppActions()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'imageInsert' | 'backgroundSelect' | 'imageSelect'>('imageInsert')

    const handleOpenBackgroundModal = () => {
        setModalType('backgroundSelect');
        setIsModalOpen(true);
    };

    const handleSearchOnline = () => {
        setIsModalOpen(true);
    };

    const handleSelectImage = (url: string) => {
        handleAddImage(addImage, url);
        setIsModalOpen(false);
      };

    const handleInsertURL = () => {
        const url = prompt('Введите URL изображения:');
        if (url) {
            handleAddImage(addImage, url);
        }
    };

    const imageItems = [
        { label: 'Загрузить с компьютера', onClick: () => handleUploadFromComputer(addImage) },
        { label: 'Найти в Интернете', onClick: handleSearchOnline },
        { label: 'Вставить URL', onClick: handleInsertURL }
    ];
    
    return (
        <div className={styles.toolbar}>
            <Button text={<FaPlus />} onClick={() => handleAddSlide(addSlide)} className={styles.button}  />
            <Button text={<FaArrowRotateLeft />} onClick={() => handleUndo(history, setEditor)} className={styles.button}  />
            <Button text={<FaArrowRotateRight />} onClick={() => handleRedo(history, setEditor)} className={styles.button}  />
            <Button text={<FaDownload />} onClick={() => handleExportToPDF(editor.presentation, exportPresentationToPDF)} className={styles.button}  />
            <Button text={<FaT />} onClick={() => {handleAddText(addText)}} className={styles.button}  />
            <DropdownMenu label={<FaFileImage size={20}/>} items={imageItems}/>
            {selectedObjectType === 'text' && (
                <TextButton currentFontSize={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontSize : 16}
                    currentFontFamily={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontFamily : "Arial"}
                />
            )}
            {selectedObjectType === 'image' && (
                <TextButton currentFontSize={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontSize : 16}
                    currentFontFamily={ selectedObject?.objectType === ObjectType.Text ? selectedObject.fontFamily : "Arial"}
                />
            )}
            {isModalOpen && <UniversalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalType} onSelect={handleSelectImage} />}
        </div>
    );
};

export {
    Toolbar
};


