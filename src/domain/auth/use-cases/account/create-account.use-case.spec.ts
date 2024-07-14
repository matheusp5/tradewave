import { CreateAccountUseCase } from '@/domain/auth/use-cases/account/create-account.use-case';
import { ICreateAccountRequest } from '@/domain/auth/dtos/account.dto';
import { Account } from '@/domain/auth/entities/account';
import { IAccountRepository } from '@/domain/auth/repositories/account-repository';
import { DuplicateResourceError } from '@/core/errors/duplicate-resource.error';
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository';
import { makeAccount } from 'tests/factories/make-account';

describe('Create Account Use Case', () => {
    let sut: CreateAccountUseCase;
    let accountRepository: IAccountRepository;

    beforeEach(() => {
        accountRepository = new InMemoryAccountRepository()
        sut = new CreateAccountUseCase(accountRepository);
    });

    it('should create a new account when the email is not already taken', async () => {
        const accountPayload = makeAccount()

        const { account } = await sut.execute(accountPayload);

        expect(account.id).toBeTruthy();
        expect(account.email).toBe(accountPayload.email);
        expect(account.firstName).toBe(accountPayload.firstName);
    });

    it('should throw DuplicateResourceError when the email is already taken', async () => {
        const firstAccountPayload = makeAccount({ email: "already@gmail.com" })
        const secondAccountPayload = makeAccount({ email: "already@gmail.com" })

        // creating the first account
        await sut.execute(firstAccountPayload);

        await expect(sut.execute(secondAccountPayload)).rejects.toThrow(DuplicateResourceError);
    });
});