import { object, string } from 'yup'

export class AccountValidation {
    static showById() {
        return object().shape({
            params: object().shape({
                id: string().required('ID é obrigatório')
            })
        })
    }

    static showByUsername() {
        return object().shape({
            params: object().shape({
                username: string().required('Nome de usuário é obrigatório')
            })
        })
    }

    static showByEmail() {
        return object().shape({
            params: object().shape({
                email: string().email('E-mail inválido').required('E-mail é obrigatório')
            })
        })
    }
}