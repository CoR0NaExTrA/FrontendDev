import styles from './TopPanel.module.css'
import { useContext, useEffect, useRef, useState } from "react"
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { useAppActions } from "../../hooks/useAppActions"
import { HistoryContext } from "../../hooks/HistoryContext";
import { handleUndo, handleRedo} from '../../utils/Handlers';
import { TitleAndMenu } from './TitleAndMenu'

function TopPanel() {
    const { setEditor } = useAppActions()
    const history = useContext(HistoryContext)

    const [image, setImage] = useState('')
    const topPanelRef = useRef<HTMLDivElement>(null);
    const [selectedObjectType, setSelectedObjectType] = useState<'text' | 'image' | 'shape' | 'slide' | null>('text');

    useEffect(() => {
        if (topPanelRef.current) {
            topPanelRef.current.focus();
        }
    }, []);

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
            <TitleAndMenu image={image} />
            <Toolbar selectedObjectType={selectedObjectType} />
        </div>
    )
}

export {
    TopPanel
}