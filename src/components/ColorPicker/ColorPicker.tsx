import { useState } from "react"
import styles from "../ColorPicker/ColorPicker.module.css"
import { FileUpload } from "../DnD InsertImage/FileUpload"

type ColorPickerProps = {
    value: string,
    onChange: (e: any) => void,

    className: string,
}

function ColorPicker({value, onChange, className}: ColorPickerProps) {

    const [image, setImage] = useState('')
    
    const handleBase64 = (base64: string) =>  {
        setImage(base64)
        value = image
    }

    return (
        <div className={`${className} ${styles.container}`}>
            <input type="color" value={value} onChange={onChange} className={styles.input_color}/>
            <input type="text" value={value} onChange={onChange} className={styles.input_text}/>
        </div>
    )
}

export {
    ColorPicker
}