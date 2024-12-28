import styles from './styles/ZoomButton.module.css'
import { useZoom } from "../../hooks/ZoomContext"

const ZoomButton = () => {
    const { zoom, setZoom } = useZoom();

    const zoomItems = [25, 50, 75, 100, 150, 200];

    const handleZoomChange = (newZoom: number) => {
        setZoom(newZoom);
    };

    return (
        <div className={styles.zoomButton}>
            <div>
                <select value={zoom} onChange={(e) => handleZoomChange(Number(e.target.value))}>
                    {zoomItems.map((level) => (
                        <option key={level} value={level}>
                            {level}%
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export {
    ZoomButton
}