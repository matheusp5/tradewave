import { model, Model, Schema, models } from 'mongoose'

export type AccountSchemaType = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    createdAt: Date
}

const accountSchema = new Schema<AccountSchemaType>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
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

export const AccountModel: Model<AccountSchemaType> =
    models.accounts || model<AccountSchemaType>('accounts', accountSchema)