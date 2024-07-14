import { object, string, number } from 'yup'

export class TransactionValidation {
  static createTransaction() {
    return object().shape({
      body: object().shape({
        email: string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        amount: number().required('Valor é obrigatório')
      })
    })
  }

  static confirmTransaction() {
    return object().shape({
      body: object().shape({
        token: string().required('Token é obrigatório')
      })
    })
  }
}
