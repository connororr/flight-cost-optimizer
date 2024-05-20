/**
 * v0 by Vercel generated the initial template.
 * @see https://v0.dev/t/RrQK3NJoqpD
 */
import React, { useState } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import {
    FlightPriceService,
    IFlightPriceService,
} from '@/services/flight-price-service';
import { useData } from '@/context/DataContext';
import ErrorMessage from '../error-message/error-message';
import { useApiService } from '@/context/ApiServiceContext';import AutoSuggestInput from "@/components/ui/auto-suggest";

export interface IRow {
    id: number;
    from: string;
    to: string;
    date: string;
}

export function useFlightInputs() {
    const { flightApiService } = useApiService();
    const flightPriceService: IFlightPriceService = new FlightPriceService(
        flightApiService
    );
    const { loading, setFetchedData, setInProgress } = useData();

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [rows, setRows] = useState<IRow[]>([
        { id: 1, from: '', to: '', date: '' },
        { id: 2, from: '', to: '', date: '' },
    ]);

    async function getFlightPrices(): Promise<void> {
        const newErrorMessages: string[] = [];
        rows.forEach((row: IRow) => {
            if (row.from === '') {
                newErrorMessages.push(
                    'Please enter a valid departure location.'
                );
            }
            if (row.to === '') {
                newErrorMessages.push('Please enter a valid arrival location.');
            }
            if (row.date === '') {
                newErrorMessages.push('Please enter a valid departure date.');
            }
        });

        if (!areDatesInChronologicalOrder(rows)) {
            newErrorMessages.push(
                'Please ensure your dates are in chronological order.'
            );
        }

        if (isPastDate(rows)) {
            newErrorMessages.push(
                'Please ensure your dates are not in the past.'
            );
        }

        if (newErrorMessages.length === 0) {
            try {
                setInProgress(true);
                setFetchedData(null);
                setErrorMessages([]);
                const flightPrices =
                    await flightPriceService.getFlightPrices(rows);
                setFetchedData(flightPrices);
            } catch (e) {
                newErrorMessages.push(
                    'Error encountered when attempting to fetch relevant flight details. Please try again.'
                );
                setErrorMessages(newErrorMessages);
            }
            setInProgress(false);
        } else {
            setErrorMessages(newErrorMessages);
        }
    }

    function isPastDate(rows: IRow[]): boolean {
        const currentDate = new Date();
        let isPast = false;

        for (let i = 0; i < rows.length; i++) {
            const rowDate = new Date(rows[i].date);
            if (rowDate < currentDate) {
                isPast = true;
            }
        }

        return isPast;
    }
    function areDatesInChronologicalOrder(rows: IRow[]): boolean {
        for (let i = 1; i < rows.length; i++) {
            const currentDate = new Date(rows[i].date);
            const previousDate = new Date(rows[i - 1].date);

            if (currentDate < previousDate) {
                return false;
            }
        }

        return true;
    }

    function handleInputChange(
        index: number,
        field: keyof IRow,
        value: string
    ): void {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    }

    function addRow() {
        setRows((prevRows) => [
            ...prevRows,
            { id: prevRows.length + 1, from: '', to: '', date: '' },
        ]);
    }

    function removeRow(index: number): void {
        setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    }

    return {
        removeRow,
        addRow,
        handleInputChange,
        getFlightPrices,
        rows,
        setRows,
        errorMessages,
        setErrorMessages,
        loading,
    };
}

export default function FlightInput() {
    const {
        removeRow,
        addRow,
        handleInputChange,
        getFlightPrices,
        rows,
        errorMessages,
        loading,
    } = useFlightInputs();

    return (
        <main key="1" className="px-4 pr-4 py-8 w-full lg:w-4/6">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <h2 className="text-2xl font-semibold">Travel Planner</h2>
                </CardHeader>
                <CardContent className="pt-4 pr-4 pb-4 space-y-4">
                    <p className="text-norwege">
                        *
                        <a
                            className="underline"
                            href="https://en.wikipedia.org/wiki/IATA_airport_code"
                        >
                            IATA
                        </a>{' '}
                        codes are needed as input values to do a search instead
                        of city names. Whilst the autocomplete functionality to
                        get IATA codes is in progress use the input field above
                        to grab the right IATA code for your desired city.
                    </p>
                    {rows.map((row, index) => (
                        <div key={row.id} className="flex space-x-2">
                            <AutoSuggestInput id={index} placeholder={'From'} handleInputChange={handleInputChange} />
                            <AutoSuggestInput id={index} placeholder={'To'} handleInputChange={handleInputChange} />
                            <Input
                                className="flex-grow"
                                id={`date${index + 1}`}
                                type="date"
                                value={row.date}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        'date',
                                        e.target.value
                                    )
                                }
                                min={new Date().toISOString().slice(0, 10)}
                                data-testid="date-input"
                            />
                            <Button
                                type="button"
                                onClick={() => removeRow(index)}
                                variant="ghost"
                                disabled={rows.length === 2}
                                aria-label="remove row"
                            >
                                <XIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {errorMessages.map((errorMessage) => (
                        <ErrorMessage message={errorMessage}></ErrorMessage>
                    ))}
                    {rows.length !== 6 && (
                        <Button
                            className="w-fit md:w-1/4 bg-norwege hover:bg-blue-900 text-white min-w-[currentSize] flex items-center whitespace-normal h-fit"
                            variant="solid"
                            onClick={addRow}
                        >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add another row
                        </Button>
                    )}
                    <Button
                        className="w-full bg-norwege hover:bg-blue-900 text-white"
                        onClick={getFlightPrices}
                        disabled={loading}
                    >
                        Search Flights
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

function PlusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}
