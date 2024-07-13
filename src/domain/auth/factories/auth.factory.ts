import { JwtEncrypter } from "@/infra/cryptography/jwt-encrypter";
import { IEncrypter } from "../cryptography/encrypter";

export class AuthFactory {
    static services() {
        const encrypter: IEncrypter = new JwtEncrypter()
    }
}