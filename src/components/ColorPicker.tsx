import styles from "../components/ColorPicker.module.css"

type ColorPickerProps = {
    value: string,
    onChange: (e: any) => void,
    className: string,
}

function ColorPicker({value, onChange, className}: ColorPickerProps) {
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