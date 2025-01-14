import { useEffect, useState } from "react";
import styles from "./PlayerView.module.css";
import { SlidePreview } from "../components/Slide/SlidePreview";
import { useAppSelector } from "../hooks/useAppSelector";

type PlayerViewProps = {
    onClose: () => void
};

function PlayerView({ onClose }: PlayerViewProps) {
    const editor = useAppSelector(editor => editor)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const currentSlide = editor.presentation.listSlides[currentSlideIndex];

    const handleMouseClick = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % editor.presentation.listSlides.length);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            setCurrentSlideIndex((prev) => (prev + 1) % editor.presentation.listSlides.length);
        } else if (e.key === "ArrowLeft") {
            setCurrentSlideIndex((prev) =>
                prev - 1 < 0 ? editor.presentation.listSlides.length - 1 : prev - 1
            )
        } else if (e.key === "Escape") {
            onClose()
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    return (
        <div className={styles.player}onClick={handleMouseClick}>
            <button className={styles.exitButton} onClick={onClose}>
                ❌
            </button>
            <div className={styles.slideContainer}>
                <SlidePreview slide={currentSlide} scale={1.75} />
            </div>
        </div>
    )
}

export default PlayerView;

