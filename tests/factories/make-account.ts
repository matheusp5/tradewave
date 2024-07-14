import { IAccountProps } from "@/domain/auth/entities/account";
import { Password } from "@/domain/auth/entities/value-objects/password";
import { faker } from "@faker-js/faker";

export function makeAccount(props: Partial<IAccountProps> = {}): IAccountProps {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: Password.createNewPassword(faker.internet.password()),
        createdAt: new Date(),
        ...props
    };
}