import { SelectionObject } from "../Entities/SelectionType"
import { SlideType } from "../Entities/SlideType"
import { Slide } from "../components/Slide/Slide"
import styles from "./Workspace.module.css"

type WorkspaceProps = {
    slide: SlideType,
    selection: SelectionObject,
}

function Workspace({slide, selection}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <Slide slide={slide} isSelected={false} isSlideCollection={false} className={''} selection={selection}/>
        </div>
    )
}

export {
    Workspace
}