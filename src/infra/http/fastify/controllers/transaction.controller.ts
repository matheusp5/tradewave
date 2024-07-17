import {
  IConfirmTransactionDTO,
  ICreateTransactionDTO
} from '@/domain/transaction/dto/transaction.dto'
import { TransactionFactory } from '@/domain/transaction/factories/transaction.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { TransactionPresenter } from '../presenters/transaction.presenter'
import { Account } from "@/domain/auth/entities/account";
const transactionServicePromise = TransactionFactory.services()


export class TransactionController {

  static async createTransaction(
    req: FastifyRequest<{ Body: ICreateTransactionDTO }>,
    reply: FastifyReply
  ) {
    const { amount, email } = req.body
    const transactionService = await transactionServicePromise

    const { transaction, confirmTransactionToken } = await transactionService.createTransaction({
      amount,
      email,
      requester: req.account
    })

    reply.send({
      transaction: TransactionPresenter.toHttp(transaction),
      confirmTransactionToken
    })
  }

  static async confirmTransaction(
    req: FastifyRequest<{ Querystring: IConfirmTransactionDTO }>,
    reply: FastifyReply
  ) {
    const transactionService = await transactionServicePromise
    const { token } = req.query

    const { transaction } = await transactionService.confirmTransaction({
      token,
      requester: req.account
    })

    reply.send({
      transaction: TransactionPresenter.toHttp(transaction)
    })
  }

  static async myTransactions(req: FastifyRequest, reply: FastifyReply) {
    const transactionService = await transactionServicePromise
    const { transactions } = await transactionService.myTransactions({
      requester: req.account
    })

    reply.send({
      transactions: transactions.map(TransactionPresenter.toHttp)
    })
  }
}
