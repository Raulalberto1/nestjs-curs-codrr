import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken'

export const useToken = (token: string): IUseToken | string => {
    try{
        const decode = jwt.decode(token) as AuthTokenResult

        const curentDate = new Date()
        const expiresDate = new Date(decode.exp)
        return {
            sub: decode.sub,
            role: decode.role,
            isExpired: +expiresDate <= +curentDate/1000,
        }
    }catch(error){
        return 'token is invalid'
    }
}