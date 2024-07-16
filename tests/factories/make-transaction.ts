import { generateId } from '@/core/utils/generate-id';
import { ITransactionProps } from '@/domain/transaction/entities/transaction';
import { faker } from '@faker-js/faker';

export function makeTransaction(props: Partial<ITransactionProps> = {}): ITransactionProps {
    return {
        payerId: generateId(),
        payeeId: generateId(),
        amount: faker.number.float({ min: 100, max: 1000 }),
        createdAt: new Date(),
        confirmedAt: faker.date.future(),
        ...props
    };
}