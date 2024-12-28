import { useState } from "react";
import { searchImages } from "../../utils/Unsplash";
import { Button } from "../buttons/Button";
import styles from './UnsplashModal.module.css';

interface UnsplashModalProps {
    onClose: () => void;
    onSelectImage: (url: string) => void;
}

const UnsplashModal: React.FC<UnsplashModalProps> = ({ onClose, onSelectImage }) => {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
  
    const handleSearch = async () => {
        setLoading(true)
        const results = await searchImages(query)
        setImages(results)
        setLoading(false)
    };
  
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <input type="text" placeholder="Search images..." value={query} onChange={(e) => setQuery(e.target.value)} className={styles.searchInput} />
                <Button text="Search" onClick={handleSearch} className={styles.button} />
                {loading && <div>Loading...</div>}
                <div className={styles.imageGrid}>
                    {images.map((image: any) => (
                    <div key={image.id} className={styles.imageItem}>
                        <img src={image.urls.thumb} alt={image.alt_description} onClick={() => onSelectImage(image.urls.full)} />
                    </div>
                    ))}
                </div>
                <Button text="Close" onClick={onClose} className={styles.button} />
            </div>
        </div>
    );
};
  
export { UnsplashModal };