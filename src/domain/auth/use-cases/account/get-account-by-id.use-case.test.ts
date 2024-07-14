import { GetAccountByIdUseCase } from '@/domain/auth/use-cases/account/get-account-by-id.use-case';
import { IAccountRepository } from '@/domain/auth/repositories/account-repository';
import { Account } from '@/domain/auth/entities/account';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository';
import { makeAccount } from 'tests/factories/make-account';

describe('Get Account By Id Use Case', () => {
    let sut: GetAccountByIdUseCase;
    let accountRepository: IAccountRepository;

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository()
        sut = new GetAccountByIdUseCase(accountRepository);
    });

    it('should return the account when found', async () => {
        const accountPayload = makeAccount()

        const account = await accountRepository.create(accountPayload);

        const findByEmailResponse = await sut.execute({ id: account.id });

        expect(findByEmailResponse).toBeTruthy();
        expect(findByEmailResponse.account.id).toBe(account.id);
    });

    it('should throw ResourceNotFoundError when account is not found', async () => {
        const id = '123';

        await expect(sut.execute({ id })).rejects.toThrow(ResourceNotFoundError);
        expect(accountRepository.getById).toHaveBeenCalledWith(id);
    });
});