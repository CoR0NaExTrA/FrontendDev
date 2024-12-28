import { useState } from "react";
import { BackgroundColor, BackgroundImage, BackgroundType } from "../../store/SlideType";
import styles from './BackgroundModal.module.css';

interface BackgroundModalProps {
    onClose: () => void;
    onApplyColor: (background: BackgroundColor) => void;
    onApplyImage: (background: BackgroundImage) => void;
}

const BackgroundModal: React.FC<BackgroundModalProps> = ({ onClose, onApplyColor, onApplyImage }) => {
    const [selectedColor, setSelectedColor] = useState<string>('#ffffff')
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApply = () => {
        if (uploadedImage) {
            onApplyImage({ type: BackgroundType.Image, url: uploadedImage });
        } else {
            onApplyColor({ type: BackgroundType.Color, color: selectedColor });
        }
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h3>Выберите фон слайда</h3>
                <div className={styles.option}>
                    <label htmlFor="colorPicker">Цвет фона:</label>
                    <input
                        type="color"
                        id="colorPicker"
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                </div>
                <div className={styles.option}>
                    <label htmlFor="imageUpload">Загрузить изображение:</label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                {uploadedImage && (
                    <div className={styles.preview}>
                        <h4>Предпросмотр изображения:</h4>
                        <img src={uploadedImage} alt="Предпросмотр" className={styles.imagePreview} />
                    </div>
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
    )
}

export {
    BackgroundModal
}
