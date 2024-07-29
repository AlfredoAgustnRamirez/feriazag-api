export interface Session{
    user: User;
    token: string
}

export interface User{
    token: User;
    id: string
    password: string
    email: string
}


export interface UserPayload{
    password: string
    email: string
}