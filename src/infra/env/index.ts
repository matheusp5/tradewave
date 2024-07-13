import * as yup from 'yup'

const envVarsSchema = yup.object({
    NODE_ENV: yup
        .string()
        .oneOf(['development', 'production', 'test'])
        .required('NODE_ENV é obrigatório'),
    PORT: yup.number().default(3333).required('PORT é obrigatório'),
    JWT_SECRET: yup.string().required('JWT_SECRET é obrigatório'),
})

const envVars = envVarsSchema.validateSync(process.env)

export default {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
    },
}