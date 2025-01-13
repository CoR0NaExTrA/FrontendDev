import { legacy_createStore as createStore } from "redux";
import { EditorReducer } from "./EditorReducer";
import { EditorType } from "../SelectionType";
import { FontFormatting, ObjectType } from "../BaseTypes";
import { BackgroundType } from "../SlideType";
import AJV from "ajv";

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

const validateEditorData = (data: any): boolean => {
    const isValid = validate(data);
    if (!isValid) {
        console.warn("Ошибки валидации:", validate.errors);
    }
    return isValid;
};

const saveStateToLocalStorage = (state: EditorType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("editorState", serializedState);
    } catch (err) {
        console.error("Ошибка сохранения состояния в localStorage", err);
    }
};

const loadStateFromLocalStorage = (): EditorType | undefined => {
    try {
        const serializedState = localStorage.getItem("editorState");
        if (!serializedState) return undefined;

        const parsedState = JSON.parse(serializedState);

        if (!validateEditorData(parsedState)) {
            console.warn("Некорректные данные в localStorage. Загружается состояние по умолчанию.");
            return undefined; // Если данные некорректны, вернуть `undefined`
        }

        return parsedState as EditorType;
    } catch (err) {
        console.error("Ошибка загрузки состояния из localStorage", err);
        return undefined;
    }
};

const preloadedState = loadStateFromLocalStorage();

const saveStateEnhancer = (createStore: any) => (...args: any) => {
    const store = createStore(...args);

    store.subscribe(() => {
        saveStateToLocalStorage(store.getState());
    });

    return store;
};

const store = createStore(EditorReducer, preloadedState, saveStateEnhancer)

export {
    store
}

