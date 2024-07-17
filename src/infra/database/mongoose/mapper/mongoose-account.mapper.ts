import { Account } from "@/domain/auth/entities/account";
import { AccountSchemaType } from "../schemas/account.schema";
import { Password } from "@/domain/auth/entities/value-objects/password";

export class MongooseAccountMapper {
    static toDomain(account: AccountSchemaType): Account {
        return Account.create(account.id, {
            firstName: account.firstName,
            lastName: account.lastName,
            username: account.username,
            email: account.email,
            password: Password.loadPassword(account.password),
            createdAt: account.createdAt,
        });
    }

    static toPersistence(account: Account): AccountSchemaType {
        return {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            username: account.username,
            email: account.email,
            password: account.password.hash,
            createdAt: account.createdAt
        }
    }
}