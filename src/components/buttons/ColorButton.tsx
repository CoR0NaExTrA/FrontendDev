import { useState } from "react"
import styles from './styles/ColorButton.module.css'
import { FaPencil } from "react-icons/fa6";

interface ColorPickerButtonProps {
    currentColor: string;
    onChange: (color: string) => void;
}

const ColorButton: React.FC<ColorPickerButtonProps> = ({ currentColor, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleColorChange = (color: string) => {
        onChange(color)
        setIsOpen(false)
    }
    
    const colors = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
        '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#C0C0C0'
    ];

    return (
        <div className={styles.colorPicker}>
            <button
                className={styles.colorButton}
                onClick={() => setIsOpen(!isOpen)}
                style={{display: "flex", flexDirection: "column"}}
            >
                <FaPencil />
                <div className={styles.colorIndicator} style={{ backgroundColor: currentColor }} />
            </button>
            {isOpen && (
                <div className={styles.colorDropdown}>
                    {colors.map((color) => (
                        <div
                            key={color}
                            className={styles.colorOption}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export {
    ColorButton
}