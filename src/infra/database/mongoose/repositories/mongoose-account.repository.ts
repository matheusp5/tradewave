import { ICreateAccountRequest } from "@/domain/auth/dtos/account.dto";
import { Account } from "@/domain/auth/entities/account";
import { IAccountRepository } from "@/domain/auth/repositories/account-repository";
import { AccountModel } from "../schemas/account.schema";
import { MongooseAccountMapper } from "../mapper/mongoose-account.mapper";

export class MongooseAccountRepository implements IAccountRepository {
    async getAll(): Promise<Account[]> {
        const accounts = await AccountModel.find().exec();
        return accounts.map(MongooseAccountMapper.toDomain);
    }

    async getById(id: string): Promise<Account | null> {
        const account = await AccountModel.findById(id).exec();
        return account ? MongooseAccountMapper.toDomain(account) : null;
    }

    async getByEmail(email: string): Promise<Account | null> {
        const account = await AccountModel.findOne({ email }).exec();
        return account ? MongooseAccountMapper.toDomain(account) : null;
    }

    async getByUsername(username: string): Promise<Account | null> {
        const account = await AccountModel.findOne({ username }).exec();
        return account ? MongooseAccountMapper.toDomain(account) : null;
    }

    async create(account: ICreateAccountRequest): Promise<Account> {
        const createdAccount = await AccountModel.create(account);
        return MongooseAccountMapper.toDomain(createdAccount);
    }

    async deleteById(id: string): Promise<void> {
        await AccountModel.findByIdAndDelete(id).exec();
    }
}