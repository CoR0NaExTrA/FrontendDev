import { createContext, useContext, useState } from "react";

interface ZoomContextProps {
    zoom: number;
    setZoom: (value: number) => void;
}

const ZoomContext = createContext<ZoomContextProps | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [zoom, setZoom] = useState(100)

    return (
        <ZoomContext.Provider value={{ zoom, setZoom }}>
            {children}
        </ZoomContext.Provider>
    )
}

export const useZoom = () => {
    const context = useContext(ZoomContext);
    if (!context) {
        throw new Error('useZoom must be used within a ZoomProvider');
    }
    return context;
};