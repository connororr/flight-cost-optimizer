import { Itineraries } from '@/constants/response';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextProps {
    children: ReactNode;
}

export interface DataContextValue {
    itineraries: Itineraries | null;
    loading: boolean;
    setFetchedData: (newData: Itineraries) => void;
    setInProgress: (loading: boolean) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
    const [itineraries, setItineraries] = useState<Itineraries | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const setFetchedData = (newData: any) => {
        setItineraries(newData);
    };

    const setInProgress = (inProgress: boolean) => {
        setLoading(inProgress);
    };

    const contextValue: DataContextValue = {
        itineraries,
        loading,
        setFetchedData,
        setInProgress,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export function useData(): DataContextValue {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
