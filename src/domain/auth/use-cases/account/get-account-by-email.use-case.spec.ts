import { GetAccountByEmailUseCase } from '@/domain/auth/use-cases/account/get-account-by-email.use-case'
import { IAccountRepository } from '@/domain/auth/repositories/account-repository'
import { Account } from '@/domain/auth/entities/account'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository'
import { makeAccount } from 'tests/factories/make-account'

describe('Get Account By Email Use Case', () => {
    let sut: GetAccountByEmailUseCase
    let accountRepository: IAccountRepository

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository()
        sut = new GetAccountByEmailUseCase(accountRepository)
    })

    it('should return the account when it exists', async () => {
        const email = 'test@example.com'
        const accountPayload = makeAccount({ email })

        const account = await accountRepository.create(accountPayload)

        const findByEmailResponse = await sut.execute({ email })

        expect(findByEmailResponse).toBeTruthy()
        expect(findByEmailResponse.account.id).toBe(account.id)
    })

    it('should throw ResourceNotFoundError when the account does not exist', async () => {
        const email = 'test@example.com'

        await expect(sut.execute({ email })).rejects.toThrow(ResourceNotFoundError)
    })
})