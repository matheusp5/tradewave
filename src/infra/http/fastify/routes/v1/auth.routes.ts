import { FastifyInstance } from 'fastify'
import { httpValidate } from '../../middlewares/http-validate'
import { authenticate } from '../../middlewares/authenticate'
import { AuthValidation } from '../../validation/auth.validation'
import { AuthController } from '../../controllers/auth.controller'

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    { preHandler: httpValidate(AuthValidation.register()) },
    AuthController.register
  )
  app.post(
    '/login',
    { preHandler: httpValidate(AuthValidation.login()) },
    AuthController.login
  )
  app.post(
    '/refresh-auth',
    { preHandler: httpValidate(AuthValidation.refreshAuth()) },
    AuthController.refreshAuth
  )
  app.get('/me', { preHandler: authenticate }, AuthController.me)
}
