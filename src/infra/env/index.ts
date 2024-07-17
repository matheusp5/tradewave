import * as yup from 'yup'

const envVarsSchema = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .required('NODE_ENV é obrigatório'),
  PORT: yup.number().default(3333).required('PORT é obrigatório'),
  JWT_SECRET: yup.string().required('JWT_SECRET é obrigatório'),
  DATABASE_URL: yup.string().required('DATABASE_URL é obrigatório')
})

const envVars = envVarsSchema.validateSync(process.env)

export default {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  jwt: {
    secret: envVars.JWT_SECRET
  }
}
