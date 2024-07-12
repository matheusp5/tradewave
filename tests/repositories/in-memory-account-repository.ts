import { ICreateAccountDTO } from "@/domain/auth/dtos/account.dto";
import { Account } from "@/domain/auth/entities/account";
import { IAccountRepository } from "@/domain/auth/repositories/account-repository";
import { randomUUID } from "crypto";

export class InMemoryAccountRepository implements IAccountRepository {
    private accounts: Account[] = []

    getAll(): Promise<Account[]> {
        return Promise.resolve(this.accounts);
    }

    getById(id: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.id === id);
        return Promise.resolve(account || null);
    }

    getByEmail(email: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.email === email);
        return Promise.resolve(account || null);
    }

    getByUsername(username: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.username === username);
        return Promise.resolve(account || null);
    }

    create(account: ICreateAccountDTO): Promise<Account> {
        const newAccount = Account.create(account, randomUUID());
        this.accounts.push(newAccount);
        return Promise.resolve(newAccount);
    }

    deleteById(id: string): Promise<void> {
        const index = this.accounts.findIndex(acc => acc.id === id);
        if (index !== -1) {
            this.accounts.splice(index, 1);
        }
        return Promise.resolve();
    }
}