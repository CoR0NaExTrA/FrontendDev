import styles from './TopPanel.module.css'
import { useContext, useEffect, useRef, useState } from "react"
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { useAppActions } from "../../hooks/useAppActions"
import { HistoryContext } from "../../hooks/HistoryContext";
import { handleUndo, handleRedo} from '../../utils/Handlers';
import { TitleAndMenu } from './TitleAndMenu'
import { useAppSelector } from '../../hooks/useAppSelector';
import { EditorType } from '../../store/SelectionType';
import { ObjectType } from '../../store/BaseTypes';

export function getSelectedObject(editor: EditorType) {
    const selectedSlide = editor.presentation.listSlides.find((slide) => slide.id === editor.selectionSlide.selectedSlideId);
    if (!selectedSlide) return null;

    const selectedObject = selectedSlide.listObjects.find((obj) => obj.id === editor.selectionObject.selectedObjectId);
    return selectedObject || null;
}

function TopPanel() {
    const editor = useAppSelector(editor => editor)
    const { setEditor } = useAppActions()
    const history = useContext(HistoryContext)

    const topPanelRef = useRef<HTMLDivElement>(null);
    const [selectedObjectType, setSelectedObjectType] = useState< ObjectType.Text | ObjectType.Image | 'slide' | null>('slide');

    useEffect(() => {
        if (topPanelRef.current) {
            topPanelRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const selectedObject = getSelectedObject(editor);
        if (selectedObject) {
            setSelectedObjectType(selectedObject.objectType);
        } else {
            setSelectedObjectType('slide');
        }
    }, [editor]);

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
        <div ref={topPanelRef} className={styles.topPanel} onKeyDown={handleKeyDown}>
            <TitleAndMenu/>
            <Toolbar selectedObjectType={selectedObjectType} />
        </div>
    )
}

export {
    TopPanel
}