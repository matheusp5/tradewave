import { object, string } from 'yup'

export class AuthValidation {
    static login() {
        return object().shape({
            body: object().shape({
                email: string().email('E-mail inválido').required('E-mail é obrigatório'),
                password: string().required('Senha é obrigatória')
            })
        })
    }

    static register() {
        return object().shape({
            body: object().shape({
                firstName: string().required('Nome é obrigatório'),
                lastName: string().required('Sobrenome é obrigatório'),
                email: string().email('E-mail inválido').required('E-mail é obrigatório'),
                password: string().required('Senha é obrigatória'),
                username: string().required('Nome de usuário é obrigatório')
            })
        })
    }

    static refreshAuth() {
        return object().shape({
            body: object().shape({
                refreshToken: string().required('Refresh token é obrigatório')
            })
        })
    }
}