import { useState } from "react";
import {
    BackgroundColor,
    BackgroundImage,
    BackgroundGradient,
    BackgroundType,
} from "../../store/SlideType";
import styles from "./BackgroundModal.module.css";
import { FaLink } from "react-icons/fa6";
import { GradientType } from "../../store/BaseTypes";

interface BackgroundModalProps {
  onClose: () => void;
  onApplyColor: (background: BackgroundColor) => void;
  onApplyImage: (background: BackgroundImage) => void;
  onApplyGradient: (background: BackgroundGradient) => void;
}

const GradientSettings = ({
    gradient,
    setGradient,
}: {
    gradient: BackgroundGradient;
    setGradient: (gradient: BackgroundGradient) => void;
}) => {
    const updateColors = (index: number, color: string) => {
        const updatedColors = [...gradient.color.colors];
        updatedColors[index] = color;
        setGradient({
        ...gradient,
        color: { ...gradient.color, colors: updatedColors },
        });
    };

    return (
        <div>
        <label>Тип градиента:</label>
        <select
            value={gradient.color.gradientType}
            onChange={(e) =>
            setGradient({
                ...gradient,
                color: {
                ...gradient.color,
                gradientType: parseInt(e.target.value, 10),
                },
            })
            }
        >
            <option value={0}>Линейный</option>
            <option value={1}>Радиальный</option>
        </select>
        {gradient.color.gradientType === GradientType.linear && (
            <div>
            <label>Угол (°):</label>
            <input
                type="number"
                value={gradient.color.linearDegrees}
                onChange={(e) => {
                    if (gradient.color.gradientType === GradientType.linear) {
                        setGradient({
                            ...gradient,
                            color: {
                            ...gradient.color,
                            linearDegrees: parseInt(e.target.value, 10),
                            },
                        });
                    }
                }}
            />
            </div>
        )}
        <div>
            <label>Первый цвет:</label>
            <input
            type="color"
            value={gradient.color.colors[0]}
            onChange={(e) => updateColors(0, e.target.value)}
            />
        </div>
        <div>
            <label>Второй цвет:</label>
            <input
            type="color"
            value={gradient.color.colors[1]}
            onChange={(e) => updateColors(1, e.target.value)}
            />
        </div>
        </div>
    );
};

const BackgroundModal: React.FC<BackgroundModalProps> = ({
    onClose,
    onApplyColor,
    onApplyImage,
    onApplyGradient,
}) => {
    const [activeTab, setActiveTab] = useState<"color" | "gradient">("color");
    const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedGradient, setSelectedGradient] = useState<BackgroundGradient>({
        type: BackgroundType.Gradient,
        color: {
        gradientType: 0,
        colors: ["#ff0000", "#0000ff"],
        linearDegrees: 90,
        },
    });

    const handleApply = () => {
        if (activeTab === "color") {
        uploadedImage
            ? onApplyImage({ type: BackgroundType.Image, url: uploadedImage })
            : onApplyColor({ type: BackgroundType.Color, color: selectedColor });
        } else {
            onApplyGradient(selectedGradient)
        }
        onClose()
    };

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
            ×
            </button>
            <h3>Выберите фон слайда</h3>
            <div className={styles.tabs}>
            <button
                className={activeTab === "color" ? styles.activeTab : ""}
                onClick={() => setActiveTab("color")}
            >
                Цвет
            </button>
            <button
                className={activeTab === "gradient" ? styles.activeTab : ""}
                onClick={() => setActiveTab("gradient")}
            >
                Градиент
            </button>
            </div>

            {activeTab === "color" && (
            <div>
                <label>Цвет фона:</label>
                <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                />
                <div>
                <label>Загрузить изображение:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () =>
                        setUploadedImage(reader.result as string);
                        reader.readAsDataURL(file);
                    }
                    }}
                />
                <button
                    className={styles.optionUrl}
                    onClick={() => {
                    const url = prompt("Введите URL изображения:");
                    if (url) onApplyImage({ type: BackgroundType.Image, url });
                    onClose();
                    }}
                >
                    {<FaLink />}
                </button>
                </div>
            </div>
            )}

            {activeTab === "gradient" && (
            <GradientSettings
                gradient={selectedGradient}
                setGradient={setSelectedGradient}
            />
            )}

            <div className={styles.actions}>
            <button className={styles.applyButton} onClick={handleApply}>
                Применить
            </button>
            <button className={styles.cancelButton} onClick={onClose}>
                Отмена
            </button>
            </div>
        </div>
        </div>
    );
};

export { BackgroundModal };

