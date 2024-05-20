const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getFutureDate(numDays: number): string {
    const now = Date.now();
    const twoDaysLater = now + numDays * DAY_IN_MS;
    const twoDaysLaterDate = new Date(twoDaysLater);

    const year = twoDaysLaterDate.getFullYear();
    const month = String(twoDaysLaterDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(twoDaysLaterDate.getDate()).padStart(2, '0'); // Day is one-based

    return `${year}-${month}-${day}`;
}
