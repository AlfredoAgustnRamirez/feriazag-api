export interface Session{
    user: User;
    token: string
}

export interface User{
    id_usuario: string
    password: string
    email: string
    userId: string
    nombreUsr: string
}


export interface UserPayload{
    password: string
    email: string
}