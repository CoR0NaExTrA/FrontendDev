import { v4 as uuid } from "uuid";
import { useState } from 'react';
import { FaTextSlash, FaT, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { RiTextBlock } from "react-icons/ri";
import { useAppActions } from '../../view/hooks/useAppActions';
import { FontFormatting, ObjectType } from '../../store/BaseTypes';

const fontFamilies = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Roboto',
    'Comic Sans MS',
];

function TextButton() {
    const [fontSize, setFontSize] = useState(14)
    const {addText, updateFontColor, updateFontFamily, updateFontSize} = useAppActions()
    const [selectedFont, setSelectedFont] = useState<string>(fontFamilies[0]);
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFont(event.target.value);
        console.log(`Выбран шрифт: ${event.target.value}`);
    };

    function onAddText() {
        addText({
            id: uuid(),
            pos: {x: 10, y: 10},
            size: {width: 100, height: 100},
            objectType: ObjectType.Text,
            fontSize: 100,
            fontFamily: 'Roboto',
            fontFormatting: FontFormatting.italic,
            fontColor: '#0000ff',
            fontBgColor: '#ffffff',
            value: '',
        })
    }

    function onUpdateFontSizeUp() {
        updateFontSize(fontSize + 1)
        setFontSize(fontSize + 1)
    }

    function onUpdateFontSizeDown() {
        updateFontSize(fontSize - 1)
        setFontSize(fontSize - 1)
    }

    return (
        <div>
            <button onClick={onAddText}>{<RiTextBlock />}</button>
            <button>{<FaTextSlash />}</button>
            <button onClick={onUpdateFontSizeUp}>{<FaT />}{<FaArrowUp size={10}/>}</button>
            <button onClick={onUpdateFontSizeDown}>{<FaT />}{<FaArrowDown size={10}/>}</button>
        </div>
    )
}

export {
    TextButton
}