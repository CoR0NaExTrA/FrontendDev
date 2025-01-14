import { useEffect } from 'react';
import styles from './App.module.css'
import { SlideCollection } from "./view/SlideCollection";
import { TopPanel } from './view/TopPanel/TopPanel';
import { Workspace } from "./view/Workspace";
import { HistoryType } from './utils/History';
import { HistoryContext } from './hooks/HistoryContext';
import 'font-awesome/css/font-awesome.min.css';
import { ZoomProvider } from './hooks/ZoomContext';
import PlayerView from './view/PlayerView';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';

type AppProps = {
    history: HistoryType,
}

function EditorView() {
    return (
        <>
            <TopPanel />
            <div className={styles.container}>
            <SlideCollection />
            <Workspace />
            </div>
        </>
    );
}

function PlayerWrapper() {
    const navigate = useNavigate();
  
    const handleClose = () => {
      navigate("/"); // Вернуться к главному экрану
    };
  
    return <PlayerView onClose={handleClose} />;
  }

function App({history}: AppProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    return (
        <HistoryContext.Provider value={history}>
            <ZoomProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<EditorView />} />
                        <Route path="/player" element={<PlayerWrapper />} />
                    </Routes>
                </BrowserRouter>
            </ZoomProvider>
        </HistoryContext.Provider>
    )
}

export default App
