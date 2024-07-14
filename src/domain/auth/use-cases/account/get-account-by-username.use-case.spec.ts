import { GetAccountByUsernameUseCase } from '@/domain/auth/use-cases/account/get-account-by-username.use-case';
import { IAccountRepository } from '@/domain/auth/repositories/account-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository';
import { makeAccount } from 'tests/factories/make-account';

describe('Get Account By Username Use Case', () => {
    let sut: GetAccountByUsernameUseCase;
    let accountRepository: IAccountRepository;

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository();
        sut = new GetAccountByUsernameUseCase(accountRepository);
    });

    it('should return the account when found', async () => {
        const accountPayload = makeAccount();
        const account = await accountRepository.create(accountPayload);

        const findByUsernameResponse = await sut.execute({ username: account.username });

        expect(findByUsernameResponse).toBeTruthy();
        expect(findByUsernameResponse.account).toEqual(account);
    });

    it('should throw ResourceNotFoundError when account is not found', async () => {
        const username = 'nonexistent_username';

        await expect(sut.execute({ username })).rejects.toThrow(ResourceNotFoundError);
    });
});