var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlightService } from "./service/flight-service";
// TODO: fix types
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
const flightService = new FlightService();
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/api/flights', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            reply.header("Access-Control-Allow-Origin", "*");
            reply.header("Access-Control-Allow-Methods", "POST");
            return yield flightService.getFlightPrices(request.body);
        }));
    });
}
export default routes;
