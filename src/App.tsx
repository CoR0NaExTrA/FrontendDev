import { useEffect } from 'react';
import styles from './App.module.css'
import { SlideCollection } from "./view/SlideCollection";
import { TopPanel } from './view/TopPanel/TopPanel';
import { Workspace } from "./view/Workspace";
import { HistoryType } from './utils/History';
import { HistoryContext } from './hooks/HistoryContext';
import 'font-awesome/css/font-awesome.min.css';
import { ZoomProvider } from './hooks/ZoomContext';

type AppProps = {
    history: HistoryType,
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
                <TopPanel/>
                <div className={styles.container}>
                    <SlideCollection />
                    <Workspace />
                </div>
            </ZoomProvider>
        </HistoryContext.Provider>
    )
}

export default App
