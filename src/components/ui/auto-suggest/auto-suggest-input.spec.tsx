import AutoSuggestInput from "@/components/ui/auto-suggest/auto-suggest-input";
import { fireEvent, render, screen, act } from "@testing-library/react";
import user from "@testing-library/user-event";

describe('AutoSuggestInput', () => {
    const mockId: number = 1;
    const mockPlaceHolder = 'mockPlaceholder';
    const mockHandleInputChange = jest.fn();

    it('should autosuggest from a set of results', async () => {
        render(<AutoSuggestInput id={mockId} placeholder={mockPlaceHolder} handleInputChange={mockHandleInputChange} />)

        const fromInputs = await screen.findAllByPlaceholderText(mockPlaceHolder);
        act(() => {
            user.type(fromInputs[0], 'Sydney');
        })
        fireEvent.click(screen.getByText('Sydney (Kingsford Smith) Airport'));

        expect(mockHandleInputChange).toHaveBeenCalledWith(mockId, mockPlaceHolder.toLowerCase(), 'SYD');
    })
})