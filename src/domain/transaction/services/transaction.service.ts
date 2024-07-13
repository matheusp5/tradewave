import { Account } from "@/domain/auth/entities/account";
import { ITransactionContract } from "../blockchain/transaction-contract";
import { ITemporaryTransactionRepository } from "../repositories/temporary-transactions-repository";
import { CreateTransactionUseCase } from "../use-cases/blockchain/create-transaction.use-case";
import { GetAccountBalanceUseCase } from "../use-cases/blockchain/get-account-balance.use-case";
import { GetTransactionsByAccountIdUseCase } from "../use-cases/blockchain/get-transactions-by-account-id.use-case";
import { CreateTemporaryTransactionUseCase } from "../use-cases/temporary/create-temporary-transaction.use-case";
import { DeleteTemporaryTransactionByIdUseCase } from "../use-cases/temporary/delete-temporary-transaction-by-id.use-case";
import { GetAllTemporaryTransactionsByAccountIdUseCase } from "../use-cases/temporary/get-all-temporary-transactions-by-account-id.use-case";
import { GetTemporaryTransactionByIdUseCase } from "../use-cases/temporary/get-temporary-transaction-by-id.use-case";
import { GetAccountByEmailUseCase } from "@/domain/auth/use-cases/account/get-account-by-email.use-case";
import { IAccountRepository } from "@/domain/auth/repositories/account-repository";
import { BadRequestError } from "@/core/errors/bad-request.error";
import { GenerateTokenUseCase } from "@/domain/auth/use-cases/auth/generate-token.use-case";
import { VerifyTokenUseCase } from "@/domain/auth/use-cases/auth/verify-token.use-case";
import { IEncrypter } from "@/domain/auth/cryptography/encrypter";
import { TokenType } from "@/core/enums/token-type";

interface ICreateTransactionDTO {
    email: string
    amount: number
}

export class TransactionService {
    private createTransactionUseCase: CreateTransactionUseCase
    private getAccountBalanceUseCase: GetAccountBalanceUseCase
    private getTransactionsByAccountIdUseCase: GetTransactionsByAccountIdUseCase

    private createTemporaryTransactionUseCase: CreateTemporaryTransactionUseCase
    private deleteTemporaryTransactionUseCase: DeleteTemporaryTransactionByIdUseCase
    private getAllTemporaryTransactionsByAccountIdUseCase: GetAllTemporaryTransactionsByAccountIdUseCase
    private getTemporaryTransactionByIdUseCase: GetTemporaryTransactionByIdUseCase

    private getAccountByEmailUseCase: GetAccountByEmailUseCase

    private generateTokenUseCase: GenerateTokenUseCase
    private verifyTokenUseCase: VerifyTokenUseCase

    constructor(
        transactionContract: ITransactionContract,
        temporaryTransactionRepository: ITemporaryTransactionRepository,
        accountRepository: IAccountRepository,
        encrypter: IEncrypter
    ) {
        this.createTransactionUseCase = new CreateTransactionUseCase(transactionContract)
        this.getAccountBalanceUseCase = new GetAccountBalanceUseCase(transactionContract)
        this.getTransactionsByAccountIdUseCase = new GetTransactionsByAccountIdUseCase(transactionContract)

        this.createTemporaryTransactionUseCase = new CreateTemporaryTransactionUseCase(temporaryTransactionRepository)
        this.deleteTemporaryTransactionUseCase = new DeleteTemporaryTransactionByIdUseCase(temporaryTransactionRepository)
        this.getAllTemporaryTransactionsByAccountIdUseCase = new GetAllTemporaryTransactionsByAccountIdUseCase(temporaryTransactionRepository)
        this.getTemporaryTransactionByIdUseCase = new GetTemporaryTransactionByIdUseCase(temporaryTransactionRepository)

        this.getAccountByEmailUseCase = new GetAccountByEmailUseCase(accountRepository)

        this.generateTokenUseCase = new GenerateTokenUseCase(encrypter)
        this.verifyTokenUseCase = new VerifyTokenUseCase(encrypter)
    }

    async createTransaction(request: ICreateTransactionDTO & { requester: Account }) {
        const payer = request.requester
        const { balance: payerBalance } = await this.getAccountBalanceUseCase.execute({ accountId: payer.id })

        if (payerBalance < request.amount) throw new BadRequestError('Saldo insuficiente.')

        const { account: payee } = await this.getAccountByEmailUseCase.execute({ email: request.email })
        const { transaction } = await this.createTemporaryTransactionUseCase.execute({ payeeId: payee.id, payerId: payer.id, amount: request.amount })
        const confirmTransactionToken = await this.generateTokenUseCase.execute({ id: transaction.id, type: TokenType.CONFIRM_TRANSACTION })

        return {
            transaction,
            confirmTransactionToken
        }
    }

    async confirmTransaction({ token, requester }: { token: string, requester: Account }) {
        const { id: transactionId } = this.verifyTokenUseCase.execute({ token })

        const { transaction } = await this.getTemporaryTransactionByIdUseCase.execute({ transactionId })
        if (transaction.payer.id !== requester.id) throw new BadRequestError('Você não tem permissão para confirmar essa transação.')

        await this.createTransactionUseCase.execute({ id: transaction.id, payerId: transaction.payer.id, payeeId: transaction.payee.id, amount: transaction.amount, createdAt: transaction.createdAt, verifiedAt: new Date() })
        await this.deleteTemporaryTransactionUseCase.execute({ transactionId, requester })

        return { transaction }
    }

    async myTransactions({ requester }: { requester: Account }) {
        const { transactions } = await this.getTransactionsByAccountIdUseCase.execute({ accountId: requester.id })
        const { transactions: temporaryTransactions } = await this.getAllTemporaryTransactionsByAccountIdUseCase.execute({ accountId: requester.id })

        return {
            transactions,
            temporaryTransactions
        }
    }

}