import React, { useState } from "react"
import AJV from "ajv"
import styles from "../Button.module.css"
import { FontFormatting, ObjectType } from "../../../store/BaseTypes"
import { BackgroundType } from "../../../store/SlideType"
import { FaFileImport } from "react-icons/fa6";

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

type ImportButtonProps = {
    onImport: (data: any) => void,
    className: string,
}

function ImportButton({ onImport, className}: ImportButtonProps) {
    const [file, setFile] = useState<File | null>(null)
    const [isClick, setIsClick] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null
        setFile(selectedFile);
    }

    const handleImport = () => {
        if (!file) {
            alert("Файл не выбран.")
            return
        }

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string)

                const valid = validate(data)
                if (!valid) {
                    alert("Неверный формат документа. Ошибки валидации:")
                    console.log(validate.errors)
                    return
                }

                onImport(data);
            } catch (error) {
                alert("Ошибка импорта: " + (error as Error).message)
            }
        }

        setIsClick(false)
        reader.readAsText(file)
    }

    return (
        <div>
            <input
                type="file"
                accept="application/json"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
            />

            <button className={`${className} ${styles.button}`} onClick={() => document.getElementById("file-input")?.click()}>
                {<FaFileImport size={20}/>}
            </button>

            <button className={styles.button} style={{position: "absolute", top: "10%", display: isClick ? "block": "none"}} onClick={handleImport}>Загрузить</button>
        </div>
    )
}

export {
    ImportButton
}