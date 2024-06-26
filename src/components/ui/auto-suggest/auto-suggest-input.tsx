import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { cityCodes } from "@/components/ui/flight-input/city-codes";
import { airportCodes } from "@/components/ui/flight-input/airport-codes";
import { IataInfo } from "@/constants";
import { IRow } from "@/components/ui/flight-input/flight-input";

type HandleInputChangeFunc = (index: number, field: keyof IRow, value: string) => void;

const codes = [...cityCodes, ...airportCodes];

interface AutoSuggestInputProps {
    id: number;
    placeholder: string;
    handleInputChange: HandleInputChangeFunc;
}

export default function AutoSuggestInput({ id, placeholder, handleInputChange }: AutoSuggestInputProps) {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    function _renderSuggestion(suggestion: IataInfo) {
        return <div className="p-3  border border-1">{suggestion.name}</div>;
    }
    function _onSuggestionsClearRequested() {
        setSuggestions([]);
    }
    function _onSuggestionsFetchRequested(value: string): void {
        const newSuggestions = _getSuggestions(value);
        setSuggestions(newSuggestions);
    }
    function _getSuggestions(value: unknown): Array<IataInfo>  {
        const inputValue = value.value.toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : codes.filter(
                (code) => code.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    }

    function _getSuggestionValue(suggestion: IataInfo): IataInfo {
       return suggestion.name;
    }

    const inputProps = {
        placeholder,
        value,
        onChange: function(_, { newValue }): void {
            setValue(newValue);
            const cityNameArray = codes.filter((code) => code.name === newValue);
            if (cityNameArray.length) {
                const iataCode = cityNameArray[0].iataCode;
                handleInputChange(id, placeholder.toLowerCase(), iataCode);
            }
        }
    }


    return (
        <div id={id}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={_onSuggestionsFetchRequested}
                onSuggestionsClearRequested={_onSuggestionsClearRequested}
                renderSuggestion={_renderSuggestion}
                getSuggestionValue={_getSuggestionValue}
                inputProps={inputProps}
                theme={{
                    input: 'w-full p-2 border-[1px] rounded-sm shadow-sm h-[38px] placeholder-black text-sm'
                }}
            />
        </div>
    )
}