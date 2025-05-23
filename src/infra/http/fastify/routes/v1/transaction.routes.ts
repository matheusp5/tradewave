import { FastifyInstance } from 'fastify'
import { httpValidate } from '../../middlewares/http-validate'
import { authenticate } from '../../middlewares/authenticate'
import { TransactionValidation } from '../../validation/transaction.validation'
import { TransactionController } from '../../controllers/transaction.controller'

export async function transactionRoutes(app: FastifyInstance) {
  app.post(
    '/create-transaction',
    { preHandler: [authenticate, httpValidate(TransactionValidation.createTransaction())] },
    TransactionController.createTransaction
  )
  app.get(
    '/my-transactions',
    { preHandler: [authenticate] },
    TransactionController.myTransactions
  )
  app.get(
    '/confirm-transaction',
    { preHandler: [authenticate] },
    TransactionController.confirmTransaction
  )
}
