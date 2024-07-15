import { ITransactionContract } from '@/domain/transaction/blockchain/transaction-contract'
import { ICreateBlockchainTransactionRequest } from '@/domain/transaction/dto/transaction.dto'
import { Transaction } from '@/domain/transaction/entities/transaction'
import { Block, Blockchain } from './blockchain'

export class EthereumTransactionContract implements ITransactionContract {
  constructor(
    private blockchain: Blockchain
  ) { }

  async createTransaction(
    data: ICreateBlockchainTransactionRequest
  ): Promise<Transaction> {

    const block = new Block(
      this.blockchain.getLatestBlock().index + 1,
      new Date().toISOString(),
      data
    )

    this.blockchain.addBlock(block)

    const transaction = Transaction.create(block.hash, data)
    return transaction
  }

  async getAllTransactionsByAccountId(
    accountId: string
  ): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    this.blockchain.chain.forEach(block => {
      block.transactions.forEach(transaction => {
        if (transaction.payerId === accountId || transaction.payeeId === accountId) {
          transactions.push(transaction);
        }
      });
    });
    return transactions;
  }
}
