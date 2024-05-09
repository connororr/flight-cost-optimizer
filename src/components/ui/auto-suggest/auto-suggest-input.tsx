import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { cityCodes } from "@/components/ui/flight-input/city-codes";
import { airportCodes } from "@/components/ui/flight-input/airport-codes";
import { IataInfo } from "@/constants";

/*
 *
 * suggestions: the subset of values that are shown to the user from the main data set once they've input a value
 * onSuggestionsClearRequested: is called when you need to set your suggestions to an empty array
 * onSuggestionsFetchRequested: is called every time your suggestions array needs to be recalculated
 */

const codes = [...cityCodes, ...airportCodes];

interface AutoSuggestInputProps {
    id: string;
    placeholder: string;
}

export default function AutoSuggestInput({ id, placeholder }: AutoSuggestInputProps) {
    const [suggestions, setSuggestions] = useState([]);

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

    function _getSuggestions(value: string): Array<IataInfo>  {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : codes.filter(
                (code) => code.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    }


    return (
        <div id={id}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={_onSuggestionsFetchRequested}
                onSuggestionsClearRequested={_onSuggestionsClearRequested}
                renderSuggestion={_renderSuggestion}
            />
        </div>
    )
}