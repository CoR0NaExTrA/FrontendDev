import { useRef } from "react"
import styles from "../styles/Button.module.css"
import { FaFileExport } from "react-icons/fa6";

type ExportButtonProps = {
    className: string,
}

function ExportButton({className}: ExportButtonProps) {
    const downloadRef = useRef<HTMLAnchorElement | null>(null)

    const handleExport = () => {
        const editorData = localStorage.getItem("editorState")
        if (!editorData) {
            alert("Нет данных для экспорта.")
            return
        }

        const blob = new Blob([editorData], { type: "application/json" })
        const url = URL.createObjectURL(blob);

        if (downloadRef.current) {
            downloadRef.current.href = url
            downloadRef.current.download = "presentation.json"
            downloadRef.current.click()

            URL.revokeObjectURL(url)
        }
    }

    return (
        <>
            <button className={`${className} ${styles.button}`} onClick={handleExport}>{<FaFileExport />}</button>
            <a ref={downloadRef} style={{ display: "none" }}>Скачать</a>
        </>
    )
}

export {
    ExportButton
}