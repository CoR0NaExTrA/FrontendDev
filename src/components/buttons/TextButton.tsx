import { FaArrowDown, FaBold, FaN , FaItalic, FaUnderline, FaA, FaPlus, FaMinus } from "react-icons/fa6";
import { useAppActions } from '../../hooks/useAppActions';
import { FontFormatting } from "../../store/BaseTypes";
import { ColorButton } from "./ColorButton";
import styles from "./styles/TextButton.module.css"

type TextToolbarProps = {
    currentFontSize: number,
    currentFontFamily: string,
    currentFontColor: string,
}

function TextButton({currentFontSize, currentFontFamily, currentFontColor}: TextToolbarProps) {
    const availableFonts: string[] = [
        "Georgia",
        "Comic Sans MS",
        "Roboto",
        "Times New Roman",
        "Arial",
    ];

    const { updateFontFamily, updateFontSize, updateFontFormatting, updateFontColor } = useAppActions()

    const handleColorChange = (color: string) => {
        updateFontColor(color)
    }

    function onUpdateFontSizeUp() {
        updateFontSize(currentFontSize + 1)
    }

    function onUpdateFontSizeDown() {
        updateFontSize(currentFontSize - 1)
    }

    function onFontFamilyChange(value: string) {
        updateFontFamily(value)
    }

    function onFontFormattingChange(value: FontFormatting) {
        console.log(value)
        updateFontFormatting(value)
    }

    return (
        <div className={styles.container}>
            <select
                value={currentFontFamily}
                onChange={(e) => onFontFamilyChange(e.target.value)}
                className={styles.selectFont}
            >
                {availableFonts.map((font) => (
                    <option key={font} value={font}>
                        {font}
                    </option>
                ))}
            </select>
            <button onClick={onUpdateFontSizeDown}>{<FaMinus/>}</button>
            <div className={styles.fontSize}>{currentFontSize}</div>
            <button onClick={onUpdateFontSizeUp}>{<FaPlus/>}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.normal)}>{<FaN />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.bold)}>{<FaBold />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.italic)}>{<FaItalic />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.underline)}>{<FaUnderline />}</button>
            <ColorButton icon={<FaA />} currentColor={currentFontColor} onChange={handleColorChange} />
        </div>
    )
}

export {
    TextButton
}