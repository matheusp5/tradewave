import { IAccountRepository } from "../repositories/account-repository";
import { GetAccountByEmailUseCase } from "../use-cases/account/get-account-by-email.use-case";
import { GetAccountByIdUseCase } from "../use-cases/account/get-account-by-id.use-case";
import { GetAccountByUsernameUseCase } from "../use-cases/account/get-account-by-username.use-case";
import { DeleteAccountByIdUseCase } from "../use-cases/account/delete-account-by-id.use-case";
import { IDeleteAccountDTO, IShowAccountByEmailDTO, IShowAccountByIdDTO, IShowAccountByUsernameDTO } from "../dtos/account.dto";

export class AccountService {
    private getAccountByEmailUseCase: GetAccountByEmailUseCase;
    private getAccountByIdUseCase: GetAccountByIdUseCase;
    private getAccountByUsernameUseCase: GetAccountByUsernameUseCase;
    private deleteAccountUseCase: DeleteAccountByIdUseCase;

    constructor(
        accountRepository: IAccountRepository
    ) {
        this.getAccountByEmailUseCase = new GetAccountByEmailUseCase(accountRepository);
        this.getAccountByIdUseCase = new GetAccountByIdUseCase(accountRepository);
        this.getAccountByUsernameUseCase = new GetAccountByUsernameUseCase(accountRepository);
        this.deleteAccountUseCase = new DeleteAccountByIdUseCase(accountRepository);
    }

    async showAccountByUsename({ username }: IShowAccountByUsernameDTO) {
        const { account } = await this.getAccountByUsernameUseCase.execute({ username });
        return { account }
    }

    async showAccountByEmail({ email }: IShowAccountByEmailDTO) {
        const { account } = await this.getAccountByEmailUseCase.execute({ email });
        return { account };
    }

    async showAccountById({ id }: IShowAccountByIdDTO) {
        const { account } = await this.getAccountByIdUseCase.execute({ id });
        return { account }
    }

    async deleteAccount({ requester }: IDeleteAccountDTO) {
        await this.deleteAccountUseCase.execute({ id: requester.id });
        return { requester }
    }
}
