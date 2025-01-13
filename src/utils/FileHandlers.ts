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
                        // Схема для текстового объекта
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
                            value: { type: "string" }, // Для текстового объекта, обязательное поле
                            fontSize: { type: "number" }, // Размер шрифта
                            fontFamily: { type: "string" }, // Семейство шрифта
                            fontFormatting: { enum: [FontFormatting.normal, FontFormatting.bold, FontFormatting.italic, FontFormatting.underline]}, // Форматирование шрифта (например, bold, italic)
                            fontColor: { type: "string" }, // Цвет шрифта
                            fontBgColor: { type: "string" }, // Цвет фона текста
                        },
                        required: [
                            "id",
                            "objectType",
                            "pos",
                            "size",
                            "value", // Для текстового объекта
                            "fontSize", // Обязателен для текстовых объектов
                            "fontFamily", // Семейство шрифта
                            "fontFormatting", // Форматирование шрифта
                            "fontColor", // Цвет шрифта
                            "fontBgColor", // Цвет фона текста
                        ],
                        },
                        {
                        // Схема для объекта изображения
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
                            url: { type: "string" }, // Для изображения
                        },
                        required: [
                            "id",
                            "objectType",
                            "pos",
                            "size",
                            "url", // Для изображения
                        ],
                        },
                    ],
                    },
                    background: {
                    type: "object",
                    oneOf: [
                        {
                        // Схема для однотонного цвета
                        properties: {
                            type: { enum: [BackgroundType.Color] },
                            color: { type: "string" }, // Обычный цвет (например, #ffffff)
                        },
                        required: ["type", "color"],
                        },
                        {
                        // Схема для изображения
                        properties: {
                            type: { enum: [BackgroundType.Image] },
                            url: { type: "string" }, // URL изображения
                        },
                        required: ["type", "url"],
                        },
                        {
                        // Схема для градиента
                        properties: {
                            type: { enum: [BackgroundType.Gradient] },
                            color: {
                            type: "object",
                            properties: {
                                gradientType: { enum: [0, 1] }, // GradientType.linear или GradientType.radial
                                colors: {
                                type: "array",
                                items: { type: "string" }, // Массив цветов
                                minItems: 2, // Градиент должен содержать как минимум два цвета
                                },
                                linearDegrees: { type: "number" }, // Только для линейного градиента
                                radialCenter: { enum: [0, 1, 2, 3, 4] }, // Только для радиального градиента
                            },
                            required: ["gradientType", "colors"], // Общие обязательные поля
                            additionalProperties: false, // Запрещаем лишние поля
                            if: {
                                properties: { gradientType: { const: 0 } }, // Если тип - линейный
                            },
                            then: {
                                required: ["linearDegrees"], // Обязательно указывать угол
                            },
                            else: {
                                required: ["radialCenter"], // Для радиального градиента нужен центр
                            },
                            },
                        },
                        required: ["type", "color"],
                        },
                    ],
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
