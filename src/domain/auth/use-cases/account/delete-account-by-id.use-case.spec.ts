import { DeleteAccountByIdUseCase } from '@/domain/auth/use-cases/account/delete-account-by-id.use-case';
import { IAccountRepository } from '@/domain/auth/repositories/account-repository';
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository';
import { makeAccount } from 'tests/factories/make-account';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

describe('Delete Account By Id Use Case', () => {
    let sut: DeleteAccountByIdUseCase;
    let accountRepository: IAccountRepository;

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository();
        sut = new DeleteAccountByIdUseCase(accountRepository);
    });

    it('should delete an account by id', async () => {
        const accountPayload = makeAccount();
        const account = await accountRepository.create(accountPayload);

        await sut.execute({ id: account.id });

        const deletedAccount = await accountRepository.getById(account.id);
        expect(deletedAccount).toBeNull();
    });

    it('should not throw an error when deleting a non-existent account', async () => {
        const nonExistentAccountId = 'non-existent-id';

        await expect(sut.execute({ id: nonExistentAccountId })).rejects.toThrow(ResourceNotFoundError);
    });
});