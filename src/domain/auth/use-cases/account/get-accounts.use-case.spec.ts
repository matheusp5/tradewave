import { GetAccountsUseCase } from '@/domain/auth/use-cases/account/get-accounts.use-case';
import { Account } from '@/domain/auth/entities/account';
import { IAccountRepository } from '@/domain/auth/repositories/account-repository';
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository';
import { makeAccount } from 'tests/factories/make-account';

describe('GetAccountsUseCase', () => {
    let getAccountsUseCase: GetAccountsUseCase;
    let accountRepository: IAccountRepository;

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository()
        getAccountsUseCase = new GetAccountsUseCase(accountRepository);
    });

    it('should return accounts from the repository', async () => {
        const accountPayloads = [
            makeAccount(),
            makeAccount(),
            makeAccount(),
            makeAccount()
        ]

        await Promise.all(accountPayloads.map(account => accountRepository.create(account)));

        const getAllResponse = await getAccountsUseCase.execute();

        for (let i = 0; i < getAllResponse.accounts.length; i++) {
            const account = getAllResponse.accounts[i]

            expect(account.email).toBe(accountPayloads[i].email);
            expect(account.firstName).toBe(accountPayloads[i].firstName);
            expect(account.lastName).toBe(accountPayloads[i].lastName);
            expect(account.username).toBe(accountPayloads[i].username);
        }
        expect(getAllResponse.accounts.length).toBe(4);
    });

    it('should return an empty array when there are no accounts', async () => {
        const getAllResponse = await getAccountsUseCase.execute();

        expect(getAllResponse.accounts.length).toBe(0);
    })
});