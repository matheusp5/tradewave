import { Transaction } from '@/domain/transaction/entities/transaction'

export class TransactionPresenter {
  static toHttp(transaction: Transaction) {
    return {
      id: transaction.id,
      payerId: transaction.payerId,
      payeeId: transaction.payeeId,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      confirmedAt: transaction.confirmedAt
    }
  }
}
