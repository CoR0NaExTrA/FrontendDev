import { FaT, FaArrowUp, FaArrowDown, FaBold, FaN , FaItalic, FaUnderline } from "react-icons/fa6";
import { useAppActions } from '../../hooks/useAppActions';
import { FontFormatting } from "../../store/BaseTypes";
import { ColorButton } from "./ColorButton";

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
        <div>
            <button onClick={onUpdateFontSizeUp}>{<FaT />}{<FaArrowUp size={10}/>}</button>
            <button onClick={onUpdateFontSizeDown}>{<FaT />}{<FaArrowDown size={10}/>}</button>
            <select
                value={currentFontFamily}
                onChange={(e) => onFontFamilyChange(e.target.value)}
            >
                {availableFonts.map((font) => (
                    <option key={font} value={font}>
                        {font}
                    </option>
                ))}
            </select>
            <button onClick={() => onFontFormattingChange(FontFormatting.normal)}>{<FaN />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.bold)}>{<FaBold />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.italic)}>{<FaItalic />}</button>
            <button onClick={() => onFontFormattingChange(FontFormatting.underline)}>{<FaUnderline />}</button>
            <ColorButton currentColor={currentFontColor} onChange={handleColorChange} />
        </div>
    )
}

export {
    TextButton
}