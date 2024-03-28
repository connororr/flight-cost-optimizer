/**
 * v0 by Vercel generated the initial template.
 * @see https://v0.dev/t/RrQK3NJoqpD
 */
import React, { useState } from 'react'
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader } from '@/components/shadcn/card'
import { FlightPriceService, IFlightPriceService } from '@/services/flight-price-service';
import { useData } from '@/context/DataContext';
import ErrorMessage from '../error-message/error-message';


export interface Row {
  id: number;
  from: string;
  to: string;
  date: string;
}

export default function FlightInput() {
  const flightPriceService: IFlightPriceService = new FlightPriceService();
  const { loading, setFetchedData, setInProgress } = useData();

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, from: '', to: '', date: '' },
    { id: 2, from: '', to: '', date: '' }, 
  ]);

  async function getFlightPrices(): Promise<void> {
    rows.forEach((row: Row) => {
      if (row.from === '') {
        setErrorMessages([...errorMessages,'Please enter a valid departure location.']);
      }
      if (row.to === '') {
        setErrorMessages([...errorMessages, 'Please enter a valid arrival location.']);
      }
      if (row.date === '') {
        const errors = [...errorMessages, 'Please enter a valid departure date.'];
        setErrorMessages(errors);
      }
    });
    if (areDatesInChronologicalOrder(rows)) {
      setErrorMessages([...errorMessages, 'Please ensure your dates are in chronological order.']);
    }
    if (errorMessages.length === 0) {
      setInProgress(true);
      setFetchedData(null);
      const flightPrices = await flightPriceService.getFlightPrices(rows);
      setFetchedData(flightPrices);
      setInProgress(false);
    }
  }

  const handleInputChange = (
    index: number,
    field: keyof Row,
    value: string
  ): void => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = (): void => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, from: '', to: '', date: '' },
    ]);
  };

  const removeRow = (index: number): void => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <main key="1" className="container mx-auto px-4 py-8 w-7/1">
      <Card className="bg-white shadow-lg rounded-lg w-4/6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Travel Planner</h2>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {rows.map((row, index) => (
            <div key={row.id} className="flex space-x-2">
              <Input
                className="flex-grow"
                id={`from${index + 1}`}
                placeholder="From"
                value={row.from}
                onChange={(e) => handleInputChange(index, 'from', e.target.value)}
              />
              <Input
                className="flex-grow"
                id={`to${index + 1}`}
                placeholder="To"
                value={row.to}
                onChange={(e) => handleInputChange(index, 'to', e.target.value)}
              />
              <Input
                className="flex-grow"
                id={`date${index + 1}`}
                type="date"
                value={row.date}
                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
              />
              <Button type="button" 
                onClick={() => removeRow(index)}
                variant="ghost"
                disabled={rows.length === 2}
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
          className="w-1/4 bg-blue-500 hover:bg-blue-600 text-white min-w-[currentSize] flex items-center" 
          variant="solid"
          onClick={addRow}
          disabled={rows.length === 6}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add another row
        </Button> 
      )} 
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
            onClick={getFlightPrices}
            disabled={loading}
          >
            Search Flights
          </Button>
        </CardContent>
      </Card>
    </main>
  )
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
  )
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
  )
}

function areDatesInChronologicalOrder(rows: Row[]): boolean {
  for (let i = 1; i < rows.length; i++) {
    const currentDate = new Date(rows[i].date);
    const previousDate = new Date(rows[i - 1].date);

    if (currentDate < previousDate) {
      return false;
    }
  }

  return true;
};