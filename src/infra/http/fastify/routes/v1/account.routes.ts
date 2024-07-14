import { FastifyInstance } from 'fastify'
import { httpValidate } from '../../middlewares/http-validate'
import { authenticate } from '../../middlewares/authenticate'
import { AccountController } from '../../controllers/account.controller'
import { AccountValidation } from '../../validation/account.validation'

export async function accountRoutes(app: FastifyInstance) {
    app.get('/show/username/:username', { preHandler: httpValidate(AccountValidation.showByUsername()) }, AccountController.showByUsername)
    app.get('/show/email/:email', { preHandler: httpValidate(AccountValidation.showByEmail()) }, AccountController.showByEmail)
    app.get('/show/id/:id', { preHandler: httpValidate(AccountValidation.showById()) }, AccountController.showById)
    app.delete('/delete', { preHandler: authenticate }, AccountController.delete)
}