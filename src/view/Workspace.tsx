import { SlideType } from "../Entities/SlideType"
import { Slide } from "../components/Slide/Slide"
import styles from "./Workspace.module.css"

type WorkspaceProps = {
    slide: SlideType,
}

function Workspace({slide}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <Slide slide={slide} isSelected={false} className={''}/>
        </div>
    )
}

export {
    Workspace
}