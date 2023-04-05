

export type User = {
    name: string,
    email: string, 
    password: string
}

export type UserSignIn = Omit<User, "name">;

export type UserDb =  User & { id: number };

export type Error = {
    name: string,
    message: string

};