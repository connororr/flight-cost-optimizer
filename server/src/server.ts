import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import routes from './routes';
import { Server } from 'tls';
import cors from '@fastify/cors';

// TODO: remove logging for prod
const server: FastifyInstance = Fastify({
  logger: true
})

await server.register(cors, { 
  origin: false
})
server.register(routes)

// TODO: remove cors stuff when going to prod
server.addHook('preHandler', (req, res, done) => {

  const allowedPaths = ["/api/flights", '*'];
  if (allowedPaths.includes(req.routeOptions.url)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers",  "*");
  }

  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
    return res.send();
  }
  done();
})

const start = async () => {
  try {
    await server.listen({ port: 3001 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()