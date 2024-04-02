export interface PayloadToken {
    sub: string;
    role: string;
}
export interface AuthBody {
    username: string;
    password: string;
}
export interface AuthTokenResult {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}
export interface IUseToken {
    sub: string;
    role: string;
    isExpired: boolean;
}
