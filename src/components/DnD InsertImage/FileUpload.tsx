import { useState } from "react"

type FileUploadProps = {
    onBase64: (base64: string) => void,
    className: string,
}

function FileUpload({onBase64, className}: FileUploadProps) {
    const [error, setError] = useState('')

    const handleDrop = (event: any) => {
        event.preventDefault();
        setError(''); // Сброс ошибок
        const file = event.dataTransfer.files[0]; // Получаем первый файл
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Пожалуйста, загрузите файл изображения.');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result // Сохраняем результат в Base64
                onBase64(base64)
            };
            reader.onerror = () => {
                setError('Ошибка при чтении файла.');
            };
            reader.readAsDataURL(file); // Читаем файл как Data URL (Base64)
        }
    }

    const handleDragOver = (event: any) => {
        event.preventDefault(); // Предотвращаем стандартное поведение
    }

    return (
        <div className={className}>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                }}
            >
                Перетащите сюда изображение
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export {
    FileUpload
}