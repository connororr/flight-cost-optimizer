import { Endpoints } from "../constants/endpoints";
import { FlightOfferRequestBody, OriginDestination, Traveler } from "../constants/external-api/request";
import { Data, FlightResponseBody, Itinerary } from "../constants/external-api/response";
import { Flight } from "../constants/frontend/request/flight";
import { Arrival, Departure, FlightLeg, Itineraries, Segment } from "../constants/frontend/response/itinerary";
import { AmadeusService, IAmadeusService } from "./amadeus-service";

export interface IFlightService {
    getFlightPrices(options: Array<Flight>): Promise<Itineraries>;
}

export class FlightService implements IFlightService {

    private amadeusService: IAmadeusService;

    constructor() {
        this.amadeusService = new AmadeusService();
    }

    // TODO: notice there's a hardcoded value that you need to write a unit test for
    public async getFlightPrices(options: Array<Flight>): Promise<Itineraries> {
        const originDestinations: Array<OriginDestination> = options.map((flight) => ({
            id: String(flight.id),
            originLocationCode: flight.from,
            destinationLocationCode: flight.to,
            departureDateTimeRange: {
                date: flight.date,
                time: '10:00:00'
            }
        }));

        // TODO: remove hardcoded value and replace with input from a button
        const travelers: Array<Traveler> = [{ id: '1', travelerType: 'ADULT' }];
        const sources: string[] = [ 'GDS' ];

        const body: FlightOfferRequestBody = {
            originDestinations,
            travelers,
            sources,
            // TODO: remove the 15 maxFlightOffers once I go live. Instead have a button to show 10 more offers
            searchCriteria: {
                maxFlightOffers: 15
            }
        }

        const response: any = await this.amadeusService.request(Endpoints.FlightPrice, body, 'POST');
        const responseJson = await response.json() as FlightResponseBody;
        return this.extractFlightInformation(responseJson);
    }

    private extractFlightInformation(responseBody: FlightResponseBody): Itineraries {
        const itineraries: Itineraries = responseBody.data.map((data: Data) => {
            
            const flightLegs: Array<FlightLeg> = data.itineraries.map((itinerary) => {
                const segments: Array<Segment> = itinerary.segments.map((segment) => {
                    
                    return {
                        departure: this.createDepartureObject(segment),
                        arrival: this.createArrivalObject(segment),
                        carrierCode: segment.carrierCode,
                        duration: segment.duration
                    }
                });

                return {
                    duration: this.formatDuration(itinerary.duration),
                    from: itinerary.segments.at(0)!.departure.iataCode,
                    to: itinerary.segments.at(-1)!.arrival.iataCode,
                    // TODO: add a unit test for the correct number of stopovers
                    numberOfStopovers: itinerary.segments.length - 1,
                    segments 
                }

            });
            // TODO: remove hardcoded price prefix when you add options for different currencies
            return {
                cost: `$${data.price.grandTotal}`,
                flightLegs
            }
        });
       
        return itineraries;
    }

    private checkDaysHavePassed(firstDate: string, secondDate: string): number {
        const date1 = new Date(firstDate);
        const date2 = new Date(secondDate);
        return date2.getDate() - date1.getDate();
    }

    private getTruncatedDate(date: string):string {
        return new Date(date).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

    private createDepartureObject(segment: Segment): Departure {
        const departureTime: string = this.getTruncatedDate(segment.departure.at);
        return {
            ...segment.departure,
            at: departureTime
        }
    }

    private createArrivalObject(segment: Segment): Arrival {
        const elapsedDays = this.checkDaysHavePassed(segment.departure.at, segment.arrival.at);
        let arrivalTime: string = this.getTruncatedDate(segment.arrival.at);
        if (elapsedDays) {
            arrivalTime += `+${elapsedDays}`;
        }

        return {
            ...segment.arrival,
            at: arrivalTime
        }
    }

    private formatDuration(duration: string): string {
        return duration
        .slice(2)
        .toLowerCase()
        .replace('h', 'h ');
    }
}