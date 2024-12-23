import { useState } from "react"
import styles from "../ColorPicker/ColorPicker.module.css"
import { FileUpload } from "../DnD InsertImage/FileUpload"

type ColorPickerProps = {
    value: string,
    onChange: (e: any) => void,
    className: string,
}

function ColorPicker({value, onChange, className}: ColorPickerProps) {

    return (
        <div className={`${className} ${styles.container}`}>
            <div className={styles.inputs}>
                <input type="color" value={value} onChange={onChange} className={styles.input_color}/>
                <input type="text" value={value} onChange={onChange} className={styles.input_text}/>
            </div>
        </div>
    )
}

export {
    ColorPicker
}