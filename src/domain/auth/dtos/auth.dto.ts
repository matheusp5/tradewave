export interface ILoginWithEmailAndPasswordDTO {
    email: string;
    password: string;
}

export interface IRegisterAccountDTO {
    firstName: string
    lastName: string;
    email: string;
    password: string;
    username: string;
}

export interface IRefreshAuthDTO {
    refreshToken: string
}

export interface IVerifyTokenDTO {
    token: string
}
