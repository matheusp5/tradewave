import { UnauthorizedError } from "@/core/errors/unauthorized.error";
import { IEncrypter } from "../cryptography/encrypter";
import { IAccountRepository } from "../repositories/account-repository";
import { CreateAccountUseCase } from "../use-cases/account/create-account.use-case";
import { GetAccountByEmailUseCase } from "../use-cases/account/get-account-by-email.use-case";
import { GetAccountByIdUseCase } from "../use-cases/account/get-account-by-id.use-case";
import { GenerateTokenUseCase } from "../use-cases/auth/generate-token.use-case";
import { VerifyTokenUseCase } from "../use-cases/auth/verify-token.use-case";
import { TokenType } from "@/core/enums/token-type";
import { Password } from "../entities/value-objects/password";
import { Account } from "../entities/account";
import { GetAccountBalanceUseCase } from "@/domain/transaction/use-cases/blockchain/get-account-balance.use-case";
import { ITransactionContract } from "@/domain/transaction/blockchain/transaction-contract";
import { ILoginWithEmailAndPasswordDTO, IRefreshAuthDTO, IRegisterAccountDTO, IVerifyTokenDTO } from "../dtos/auth.dto";

export class AuthService {
    private getAccountByEmailUseCase: GetAccountByEmailUseCase;
    private getAccountByIdUseCase: GetAccountByIdUseCase;
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
        this.createAccountUseCase = new CreateAccountUseCase(accountRepository);

        this.generateTokenUseCase = new GenerateTokenUseCase(encrypter);
        this.verifyTokenUseCase = new VerifyTokenUseCase(encrypter);

        this.getAccountBalanceUseCase = new GetAccountBalanceUseCase(transactionContract);
    }

    async login({ email, password }: ILoginWithEmailAndPasswordDTO) {
        const { account } = await this.getAccountByEmailUseCase.execute({ email });

        if (!account.password.comparePasswords(password)) throw new UnauthorizedError("E-mail ou senha não encontrados. Verifique suas credenciais.")

        const accessToken = await this.generateTokenUseCase.execute({ sub: account.id, type: TokenType.ACCESS });
        const refreshToken = await this.generateTokenUseCase.execute({ sub: account.id, type: TokenType.REFRESH });

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

        const accessToken = await this.generateTokenUseCase.execute({ sub: account.id, type: TokenType.ACCESS });
        const refreshToken = await this.generateTokenUseCase.execute({ sub: account.id, type: TokenType.REFRESH });

        return {
            account,
            tokens: {
                access: accessToken,
                refresh: refreshToken
            }
        }
    }

    async refreshAuth({ refreshToken }: IRefreshAuthDTO) {
        const { sub } = await this.verifyTokenUseCase.execute({ token: refreshToken });

        const accessToken = await this.generateTokenUseCase.execute({ sub, type: TokenType.ACCESS });
        const newRefreshToken = await this.generateTokenUseCase.execute({ sub, type: TokenType.REFRESH });

        return {
            tokens: {
                access: accessToken,
                refresh: newRefreshToken
            }
        }
    }

    async verifyToken({ token }: IVerifyTokenDTO) {
        const { sub, type } = await this.verifyTokenUseCase.execute({ token });
        const { account } = await this.getAccountByIdUseCase.execute({ id: sub });
        return { account, type }
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