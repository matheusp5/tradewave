import { UnauthorizedError } from "@/core/errors/unauthorized.error";
import { IEncrypter } from "../cryptography/encrypter";
import { IAccountRepository } from "../repositories/account-repository";
import { CreateAccountUseCase } from "../use-cases/account/create-account.use-case";
import { GetAccountByEmailUseCase } from "../use-cases/account/get-account-by-email.use-case";
import { GetAccountByIdUseCase } from "../use-cases/account/get-account-by-id.use-case";
import { GetAccountByUsernameUseCase } from "../use-cases/account/get-account-by-username.use-case";
import { GenerateTokenUseCase } from "../use-cases/auth/generate-token.use-case";
import { VerifyTokenUseCase } from "../use-cases/auth/verify-token.use-case";
import { TokenType } from "@/core/enums/token-type";
import { Password } from "../entities/value-objects/password";
import { Account } from "../entities/account";
import { GetAccountBalanceUseCase } from "@/domain/transaction/use-cases/blockchain/get-account-balance.use-case";
import { ITransactionContract } from "@/domain/transaction/blockchain/transaction-contract";

interface ILoginWithEmailAndPasswordDTO {
    email: string;
    password: string;
}

interface IRegisterAccountDTO {
    firstName: string
    lastName: string;
    email: string;
    password: string;
    username: string;
}

interface IRefreshAuthDTO {
    refreshToken: string
}

interface IVerifyTokenDTO {
    token: string
}

export class AuthService {
    private getAccountByEmailUseCase: GetAccountByEmailUseCase;
    private getAccountByIdUseCase: GetAccountByIdUseCase;
    private getAccountByUsernameUseCase: GetAccountByUsernameUseCase;
    private createAccountUseCase: CreateAccountUseCase;

    private generateTokenUseCase: GenerateTokenUseCase;
    private verifyTokenUseCase: VerifyTokenUseCase;

    private getAccountBalanceUseCase: GetAccountBalanceUseCase;

    constructor(
        encrypter: IEncrypter,
        accountRepository: IAccountRepository,
        transactionContract: ITransactionContract
    ) {
        this.getAccountByEmailUseCase = new GetAccountByEmailUseCase(accountRepository);
        this.getAccountByIdUseCase = new GetAccountByIdUseCase(accountRepository);
        this.getAccountByUsernameUseCase = new GetAccountByUsernameUseCase(accountRepository);
        this.createAccountUseCase = new CreateAccountUseCase(accountRepository);

        this.generateTokenUseCase = new GenerateTokenUseCase(encrypter);
        this.verifyTokenUseCase = new VerifyTokenUseCase(encrypter);

        this.getAccountBalanceUseCase = new GetAccountBalanceUseCase(transactionContract);
    }

    async loginWithEmailAndPassword({ email, password }: ILoginWithEmailAndPasswordDTO) {
        const { account } = await this.getAccountByEmailUseCase.execute({ email });

        if (!account.password.comparePasswords(password)) throw new UnauthorizedError("E-mail ou senha não encontrados. Verifique suas credenciais.")

        const accessToken = await this.generateTokenUseCase.execute({ id: account.id, type: TokenType.ACCESS });
        const refreshToken = await this.generateTokenUseCase.execute({ id: account.id, type: TokenType.REFRESH });

        return {
            account,
            tokens: {
                access: accessToken,
                refresh: refreshToken
            }
        }
    }

    async register(dto: IRegisterAccountDTO) {
        const { account } = await this.createAccountUseCase.execute({
            ...dto,
            password: Password.createNewPassword(dto.password)
        })

        const accessToken = await this.generateTokenUseCase.execute({ id: account.id, type: TokenType.ACCESS });
        const refreshToken = await this.generateTokenUseCase.execute({ id: account.id, type: TokenType.REFRESH });

        return {
            account,
            tokens: {
                access: accessToken,
                refresh: refreshToken
            }
        }
    }

    async refreshAuth({ refreshToken }: IRefreshAuthDTO) {
        const { id } = await this.verifyTokenUseCase.execute({ token: refreshToken });

        const accessToken = await this.generateTokenUseCase.execute({ id, type: TokenType.ACCESS });
        const newRefreshToken = await this.generateTokenUseCase.execute({ id, type: TokenType.REFRESH });

        return {
            tokens: {
                access: accessToken,
                refresh: newRefreshToken
            }
        }
    }

    async verifyToken({ token }: IVerifyTokenDTO) {
        return this.verifyTokenUseCase.execute({ token });
    }

    async me({ requester }: { requester: Account }) {
        const balance = await this.getAccountBalanceUseCase.execute({ accountId: requester.id });
        return {
            account: {
                ...requester,
                ...balance
            }
        }
    }
}