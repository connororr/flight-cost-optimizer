import React, { createContext, useContext, ReactNode } from 'react';
import { FlightApiService, IFlightApiService } from "@/services/flight-api-service";

interface ApiServiceContextProps {
    children: ReactNode;
}

export interface ApiServiceContextValue {
    flightApiService: IFlightApiService;
}

const ApiServiceContext = createContext<ApiServiceContextValue | undefined>(undefined);

export const ApiServiceProvider: React.FC<ApiServiceContextProps> = ({ children }) => {

    const flightApiService = new FlightApiService();

    const contextValue: ApiServiceContextValue = {
        flightApiService
    };

    return <ApiServiceContext.Provider value={contextValue}>{children}</ApiServiceContext.Provider>;
};

export function useApiService(): ApiServiceContextValue {
    const context = useContext(ApiServiceContext);
    if (!context) {
        throw new Error('useApiService must be used within a ApiServiceProvider');
    }
    return context;
}
