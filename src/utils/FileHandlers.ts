import AJV from "ajv";
import { BackgroundType } from "../store/SlideType";
import { FontFormatting, ObjectType } from "../store/BaseTypes";

const schema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                name: { type: "string" },
                listSlides: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            listObjects: {
                                type: "array",
                                items: [
                                    {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            objectType: { enum: [ObjectType.Text] },
                                            pos: {
                                                type: "object",
                                                properties: {
                                                x: { type: "number" },
                                                y: { type: "number" },
                                                },
                                                required: ["x", "y"],
                                            },
                                            size: {
                                                type: "object",
                                                properties: {
                                                width: { type: "number" },
                                                height: { type: "number" },
                                                },
                                                required: ["width", "height"],
                                            },
                                            value: { type: "string" }, 
                                            fontSize: { type: "number" },
                                            fontFamily: { type: "string" },
                                            fontFormatting: { enum: [FontFormatting.normal, FontFormatting.bold, FontFormatting.italic, FontFormatting.underline]}, // Форматирование шрифта (например, bold, italic)
                                            fontColor: { type: "string" },
                                            fontBgColor: { type: "string" },
                                        },
                                        required: [
                                            "id",
                                            "objectType",
                                            "pos",
                                            "size",
                                            "value",
                                            "fontSize",
                                            "fontFamily",
                                            "fontFormatting",
                                            "fontColor",
                                            "fontBgColor",
                                        ],
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            objectType: { enum: [ObjectType.Image] },
                                            pos: {
                                                type: "object",
                                                properties: {
                                                x: { type: "number" },
                                                y: { type: "number" },
                                                },
                                                required: ["x", "y"],
                                            },
                                            size: {
                                                type: "object",
                                                properties: {
                                                width: { type: "number" },
                                                height: { type: "number" },
                                                },
                                                required: ["width", "height"],
                                            },
                                            url: { type: "string" },
                                        },
                                        required: [
                                            "id",
                                            "objectType",
                                            "pos",
                                            "size",
                                            "url",
                                        ],
                                    },
                                ],
                            },
                            background: {
                                type: "object",
                                properties: {
                                type: { enum: [BackgroundType.Color, BackgroundType.Image] },
                                color: { type: "string" },
                                url: { type: "string" },
                                },
                                required: ["type"],
                            },
                        },
                        required: ["id", "listObjects", "background"],
                    },
                },
            },
            required: ["name", "listSlides"],
        },
    },
    required: ["presentation"],
}


const ajv = new AJV()
const validate = ajv.compile(schema)

export const handleExport = (editorState: string | null, downloadRef: React.RefObject<HTMLAnchorElement>) => {
    if (!editorState) {
        alert("Нет данных для экспорта.")
        return
    }

    const blob = new Blob([editorState], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    if (downloadRef.current) {
        downloadRef.current.href = url
        downloadRef.current.download = "presentation.json"
        downloadRef.current.click()
        URL.revokeObjectURL(url)
    }
}

export const handleImport = ( file: File, setEditor: (data: any) => void ) => {
    const reader = new FileReader()
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result as string)
            const valid = validate(data)
            if (!valid) {
                alert("Неверный формат документа. Ошибки валидации:")
                console.log(validate.errors)
                return
            }
            setEditor(data)
        } catch (error) {
            alert("Ошибка импорта: " + (error as Error).message)
        }
    }
    reader.readAsText(file)
}
