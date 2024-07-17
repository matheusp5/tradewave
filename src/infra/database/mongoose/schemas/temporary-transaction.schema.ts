import { model, Model, Schema, models } from 'mongoose'

export type TemporaryTransactionSchemaType = {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
}

const accountSchema = new Schema<TemporaryTransactionSchemaType>(
    {
        payerId: { type: String, required: true },
        payeeId: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    {
        id: true, // returns id at queries
        timestamps: {
            createdAt: true,
            updatedAt: false,
        }, // add createdAt and updatedAt column
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

export const TemporaryTransacionModel: Model<TemporaryTransactionSchemaType> =
    models.temporaryTransactions || model<TemporaryTransactionSchemaType>('temporaryTransactions', accountSchema)