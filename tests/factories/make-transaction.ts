import { ITransactionProps } from '@/domain/transaction/entities/transaction';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import { toChecksumAddress, publicToAddress, privateToPublic } from 'ethereumjs-util';


export function generateAddress() {
    const privateKey = crypto.randomBytes(32);
    const publicKey = privateToPublic(privateKey);
    const addressBuffer = publicToAddress(publicKey);
    return toChecksumAddress("0x".concat(addressBuffer.toString('hex')));
}

export function makeTransaction(props: Partial<ITransactionProps> = {}): ITransactionProps {
    return {
        payerId: generateAddress(),
        payeeId: generateAddress(),
        amount: faker.number.float({ min: 100, max: 1000 }),
        createdAt: new Date(),
        confirmedAt: faker.date.future(),
        ...props
    };
}