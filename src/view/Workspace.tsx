import { Slide } from "../components/Slide/Slide"
import { SlideType } from "../store/SlideType"
import { useAppSelector } from "./../hooks/useAppSelector"
import styles from "./Workspace.module.css"

function Workspace() {
    const editor = useAppSelector((editor => editor))
    const selectedSlide: SlideType = editor.presentation.listSlides.find(slide => slide.id == editor.selectionSlide.selectedSlideId) || editor.presentation.listSlides[0]

    return (
        <div className={styles.workspace}>
            <Slide slide={selectedSlide} isSlideCollection={false} className={''}/>
        </div>
    )
}

export {
    Workspace
}