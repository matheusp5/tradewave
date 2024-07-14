import { generateId } from "@/core/utils/generate-id";
import { ICreateAccountRequest } from "@/domain/auth/dtos/account.dto";
import { Account } from "@/domain/auth/entities/account";
import { IAccountRepository } from "@/domain/auth/repositories/account-repository";
import { randomUUID } from "crypto";

export class InMemoryAccountRepository implements IAccountRepository {
    private accounts: Account[] = []

    async getAll(): Promise<Account[]> {
        return this.accounts;
    }

    async getById(id: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.id === id);
        return account ?? null;
    }

    async getByEmail(email: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.email === email);
        return account ?? null;
    }

    async getByUsername(username: string): Promise<Account | null> {
        const account = this.accounts.find(acc => acc.username === username);
        return account ?? null;
    }

    async create(account: ICreateAccountRequest): Promise<Account> {
        const newAccount = Account.create(generateId(), account);
        this.accounts.push(newAccount);
        return newAccount;
    }

    async deleteById(id: string): Promise<void> {
        const index = this.accounts.findIndex(acc => acc.id === id);
        if (index !== -1) {
            this.accounts.splice(index, 1);
        }

    }
}