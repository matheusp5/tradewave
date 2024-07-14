import {
  IConfirmTransactionDTO,
  ICreateTransactionDTO
} from '@/domain/transaction/dto/transaction.dto'
import { TransactionFactory } from '@/domain/transaction/factories/transaction.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { TransactionPresenter } from '../presenters/transaction.presenter'

const transactionService = TransactionFactory.services()

export class TransactionController {
  static async createTransaction(
    req: FastifyRequest<{ Body: ICreateTransactionDTO }>,
    reply: FastifyReply
  ) {
    const { amount, email } = req.body

    const { transaction } = await transactionService.createTransaction({
      amount,
      email,
      requester: req.account
    })

    reply.send({
      transaction: TransactionPresenter.toHttp(transaction)
    })
  }

  static async confirmTransaction(
    req: FastifyRequest<{ Params: IConfirmTransactionDTO }>,
    reply: FastifyReply
  ) {
    const { token } = req.params

    const { transaction } = await transactionService.confirmTransaction({
      token,
      requester: req.account
    })

    reply.send({
      transaction: TransactionPresenter.toHttp(transaction)
    })
  }

  static async myTransactions(req: FastifyRequest, reply: FastifyReply) {
    const { transactions } = await transactionService.myTransactions({
      requester: req.account
    })

    reply.send({
      transactions: transactions.map(TransactionPresenter.toHttp)
    })
  }
}
