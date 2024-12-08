import { useState } from "react"
import styles from "../ColorPicker/ColorPicker.module.css"
import { FileUpload } from "../DnD InsertImage/FileUpload"

type ColorPickerProps = {
    value: string,
    onChange: (e: any) => void,
    onClick: () => void,
    onReset: () => void,
    className: string,
}

function ColorPicker({value, onChange, className, onClick, onReset}: ColorPickerProps) {
    const [image, setImage] = useState('')
    
    const handleBase64 = (base64: string) =>  {
        setImage(base64)
    }

    return (
        <div className={`${className} ${styles.container}`}>
            <div className={styles.inputs}>
                <input type="color" value={value} onChange={onChange} className={styles.input_color}/>
                <input type="text" value={value} onChange={onChange} className={styles.input_text}/>
            </div>
            <FileUpload onClick={onClick} onReset={onReset} onBase64={handleBase64} className={styles.file_upload}/>
        </div>
    )
}

export {
    ColorPicker
}