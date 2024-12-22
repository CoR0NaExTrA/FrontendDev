import React from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight, FaDownload, FaPlus, FaT } from 'react-icons/fa6';
import styles from './Toolbar.module.css';
import { TextButton } from '../../components/buttons/TextButton';
import { Button } from '../../components/buttons/Button';
import { getSelectedObject, handleAddSlide, handleAddText, handleExportToPDF, handleRedo, handleUndo } from '../../utils/Handlers';
import { useAppActions } from '../hooks/useAppActions';
import { exportPresentationToPDF } from '../../store/functions/exportPDF';
import { useAppSelector } from '../hooks/useAppSelector';
import { ObjectType } from '../../store/BaseTypes';

interface ToolbarProps {
    selectedObjectType: 'text' | 'image' | 'shape' | 'slide' | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedObjectType }) => {
    const editor = useAppSelector((editor => editor))
    const selectedObject = getSelectedObject(editor);
    const {addSlide, addText, addImage, editBackground, setEditor } = useAppActions()
    return (
        <div className={styles.toolbar}>
            <Button text={<FaPlus />} onClick={() => handleAddSlide(addSlide)} className={styles.button}  />
            <Button text={<FaArrowRotateLeft />} onClick={() => handleUndo(history, setEditor)} className={styles.button}  />
            <Button text={<FaArrowRotateRight />} onClick={() => handleRedo(history, setEditor)} className={styles.button}  />
            <Button text={<FaDownload />} onClick={() => handleExportToPDF(editor.presentation, exportPresentationToPDF)} className={styles.button}  />
            <Button text={<FaT />} onClick={() => {handleAddText(addText)}} className={styles.button}  />
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
        </div>
    );
};

export {
    Toolbar
};


