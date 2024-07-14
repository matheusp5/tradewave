import fastify from 'fastify'
import { envToLogger } from '@/core/logger/fastify'
import { fastifyErrorHandler } from '@/core/errors/fastify-error-handler'
import env from '@/infra/env'
import v1Routes from './routes/v1'

export const app = fastify({ logger: envToLogger[env.nodeEnv] ?? true })

// ERROR HANDLER
app.setErrorHandler(fastifyErrorHandler)

// v1 ROUTES
v1Routes.forEach(route => {
    app.register(route.route, { prefix: route.path })
})