import { useState } from "react";
import { searchImages } from "../../utils/Unsplash";
import { Button } from "../../components/buttons/Button";
import styles from './UnsplashModal.module.css';
import { ColorPicker } from "../../components/ColorPicker/ColorPicker";
import { handleEditBackground } from "../../utils/Handlers";
import { useAppActions } from "../../hooks/useAppActions";

interface UniversalModalProps {
    isOpen: boolean
    onClose: () => void
    mode: 'imageInsert' | 'backgroundSelect' | 'imageSelect'
    onSelect: (value: string) => void
}

const UniversalModal: React.FC<UniversalModalProps> = ({ isOpen, onClose, mode, onSelect }) => {
    const {editBackground} = useAppActions()

    if (!isOpen) return null

    const handleSelectValue = (value: string) => {
        if (onSelect) onSelect(value)
        onClose()
    }
    
    const [query, setQuery] = useState('')
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("ffffff")
  
    const handleSearch = async () => {
        setLoading(true)
        const results = await searchImages(query)
        setImages(results)
        setLoading(false)
    };
  
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {mode === 'imageInsert' &&
                    <>
                        <input type="text" placeholder="Search images..." value={query} onChange={(e) => setQuery(e.target.value)} className={styles.searchInput} />
                        <Button text="Search" onClick={handleSearch} className={styles.button} />
                        {loading && <div>Loading...</div>}
                        <div className={styles.imageGrid}>
                            {images.map((image: any) => (
                            <div key={image.id} className={styles.imageItem}>
                                <img src={image.urls.thumb} alt={image.alt_description} onClick={() => onSelect(image.urls.full)} />
                            </div>
                            ))}
                        </div>
                        <Button text="Close" onClick={onClose} className={styles.button} />
                    </>
                }

                {
                    mode === 'backgroundSelect' && 
                    <>
                        <div>
                            <span>Цвет</span>
                            <ColorPicker value={color} onChange={() => handleEditBackground(editBackground, color)} className=""/>
                        </div>
                        <div>
                            <span>Изображение</span>
                            <Button text='Выбрать изображение' onClick={() => mode = 'imageSelect'} className={styles.button}/>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};
  
export { UniversalModal };