

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
export type Session = {
    id: number,
    userId: number,
    token: string;
    }

export type createBook = {
    name: string, 
    author: string, 
    userId: number
};

export type Book = {
    id: number,
    name: string, 
    author: string, 
    available: boolean,
    userId: number
}    