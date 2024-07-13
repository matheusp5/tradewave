import fastify from 'fastify'
import { envToLogger } from '@/core/logger/fastify'
import { fastifyErrorHandler } from '@/core/errors/fastify-error-handler'
import env from '@/infra/env'

export const app = fastify({ logger: envToLogger[env.nodeEnv] ?? true })

// ERROR HANDLER
app.setErrorHandler(fastifyErrorHandler)

