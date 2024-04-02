import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypr from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadToken } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ){}

    public async validateUser(username: string, password: string){
        const userByUserName= await this.userService.findBy({
            key: 'username',
            value: username,
        })
        const UserByEmail=await this.userService.findBy({
            key: 'email',
            value: username,
        })

        if(userByUserName){
            const match = await bcrypr.compare(password, userByUserName.password)
            if(match)return userByUserName
        }

        if(UserByEmail){
            const match = await bcrypr.compare(password, UserByEmail.password)
            if(match)return UserByEmail
        }
    }

    public signJWT({payload, secret, expires}:{payload:jwt.JwtPayload; secret: string; expires:number|string}){
        return jwt.sign(payload, secret, {expiresIn: expires})
    }

    public async generateJWT(user: UsersEntity):Promise<any>{
        const getUser= await this.userService.findUserById(user.id)

        const payload: PayloadToken = {
            role: getUser.role,
            sub: getUser.id
        }

        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires:'1h'
            }),
            user
        }
    }
}
