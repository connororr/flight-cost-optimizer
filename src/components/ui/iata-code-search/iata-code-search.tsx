import { Card, CardContent } from '@/components/shadcn/card';
import React, { useState } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { useApiService } from '@/context/ApiServiceContext';
import {
    IIataCodeService,
    IataCodeService,
} from '@/services/iata-code-service';

export function useCityNameInputs() {
    const [city, setCity] = useState<string>('');
    const [iataCode, setIataCode] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const { flightApiService } = useApiService();
    const iataCodeService: IIataCodeService = new IataCodeService(
        flightApiService
    );

    async function getIataCodes() {
        try {
            setLoading(true);
            const cities = await iataCodeService.getIataCodes(city);
            setIataCode(cities[0].iataCode);
        } catch (e) {
            // do nothing
        }
        setLoading(false);
    }

    return { getIataCodes, setCity, iataCode, isLoading };
}

export default function IataCodeSearch() {
    const { getIataCodes, setCity, iataCode, isLoading } = useCityNameInputs();

    return (
        <main className="px-4 w-full md:w-4/6 pt-4 flex justify-start">
            <Card className="bg-white shadow-lg rounded-lg md:w-5/6">
                <CardContent className="p-4 space-y-4 flex items-center">
                    <Input
                        className="flex-grow w-3/5 mr-5"
                        placeholder="City name"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Button
                        className="w-1/5 bg-norwege hover:bg-blue-900 text-white items-center !m-0 min-w-32px whitespace-normal"
                        variant="solid"
                        onClick={getIataCodes}
                        disabled={isLoading}
                    >
                        Get Code!
                    </Button>
                    <div className="w-1/4 !m-0 text-[#017396]">{iataCode}</div>
                </CardContent>
            </Card>
        </main>
    );
}
